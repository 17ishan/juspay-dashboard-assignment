// src/pages/Orders/OrderList.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import ordersData from "../../data/ordersData";
import {
  Search,
  Filter as FilterIcon,
  Plus,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

/**
 * OrderList (light theme, compact)
 * - Scrollable table area
 * - Smaller text and tighter row spacing to match provided screenshot
 * - Filter popover (faded icon), search, sort, selection, pagination (up to 5)
 */

const PAGE_SIZE = 10;

function StatusDot({ status }) {
  const map = {
    "In Progress": "bg-indigo-400",
    Complete: "bg-emerald-400",
    Pending: "bg-sky-300",
    Approved: "bg-amber-400",
    Rejected: "bg-gray-400",
  };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${map[status] || "bg-gray-300"}`} />;
}

export default function OrderList() {
  // UI state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);

  // Close filter popover on outside click or escape
  useEffect(() => {
    function onDocClick(e) {
      if (
        filterOpen &&
        filterPanelRef.current &&
        !filterPanelRef.current.contains(e.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target)
      ) {
        setFilterOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setFilterOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [filterOpen]);

  // Derived data: filter/search/sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let data = ordersData.slice();

    if (statusFilter !== "All") data = data.filter((r) => r.status === statusFilter);

    if (q) {
      data = data.filter((r) => {
        return (
          r.orderId.toLowerCase().includes(q) ||
          r.user.toLowerCase().includes(q) ||
          r.project.toLowerCase().includes(q) ||
          r.address.toLowerCase().includes(q)
        );
      });
    }

    data.sort((a, b) => {
      const na = Number(a.orderId.replace(/[^0-9]/g, ""));
      const nb = Number(b.orderId.replace(/[^0-9]/g, ""));
      return sortAsc ? na - nb : nb - na;
    });

    return data;
  }, [query, statusFilter, sortAsc]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageData = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  // handlers
  const toggleSelect = (orderId) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(orderId)) copy.delete(orderId);
      else copy.add(orderId);
      return copy;
    });
  };

  const toggleSelectAll = () => {
    const pageIds = pageData.map((r) => r.orderId);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
    setSelected((prev) => {
      const copy = new Set(prev);
      if (allSelected) {
        pageIds.forEach((id) => copy.delete(id));
      } else {
        pageIds.forEach((id) => copy.add(id));
      }
      return copy;
    });
  };

  const changePage = (p) => {
    setPage(p);
    const main = document.querySelector("main");
    if (main && typeof main.scrollTo === "function") main.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination up to 5 pages centered
  const renderPaginationButtons = () => {
    const pages = [];
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = pageSafe - Math.floor(maxButtons / 2);
      let end = pageSafe + Math.floor(maxButtons / 2);
      if (start < 1) {
        start = 1;
        end = maxButtons;
      } else if (end > totalPages) {
        end = totalPages;
        start = totalPages - (maxButtons - 1);
      }
      for (let i = start; i <= end; i++) pages.push(i);
    }

    return (
      <>
        {pages[0] > 1 && (
          <>
            <button
              onClick={() => changePage(1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-gray-50"
            >
              1
            </button>
            {pages[0] > 2 && <span className="px-2 text-gray-300">…</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => changePage(p)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              p === pageSafe ? "bg-gray-900 text-white" : "hover:bg-gray-50"
            }`}
            aria-current={p === pageSafe ? "page" : undefined}
          >
            {p}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="px-2 text-gray-300">…</span>}
            <button
              onClick={() => changePage(totalPages)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  const statuses = ["All", "In Progress", "Complete", "Pending", "Approved", "Rejected"];

  return (
    <div className="min-h-[60vh] p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold">Order List</h2>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-3 rounded-md bg-gray-100 h-9">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-100 transition" aria-label="New" title="New">
            <Plus size={16} />
          </button>

          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={() => setFilterOpen((s) => !s)}
              aria-expanded={filterOpen}
              aria-haspopup="true"
              title="Filter"
              className={`p-2 rounded transition ${filterOpen ? "opacity-100 bg-gray-50" : "opacity-60 hover:opacity-90"}`}
            >
              <FilterIcon size={16} />
            </button>

            {filterOpen && (
              <div
                ref={filterPanelRef}
                className="absolute left-0 top-10 z-30 w-44 bg-white border border-gray-200 rounded shadow p-2"
              >
                <div className="text-xs text-gray-600 mb-2">Filter by status</div>
                <ul className="text-sm">
                  {statuses.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => {
                          setStatusFilter(s);
                          setPage(1);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded hover:bg-gray-50 ${s === statusFilter ? "font-medium" : ""}`}
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={() => setSortAsc((s) => !s)}
            className="p-2 rounded hover:bg-gray-100 transition"
            aria-label="Sort"
            title="Toggle sort Order ID"
          >
            <ArrowUpDown size={16} />
          </button>
        </div>

        {/* search & select */}
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center bg-white rounded-sm px-3 py-2 shadow-sm lg:mr-6 h-6 ">
            <Search size={16} className="text-gray-400" />
            <input
              aria-label="Search orders"
              className="    md:w-72 bg-transparent outline-none text-sm placeholder:text-gray-400 "
              placeholder="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>

          
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white   rounded-lg  overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ maxHeight: "calc(100vh - 300px)" }} 
      >
        <table className="min-w-full divide-y divide-gray-100 text-sm ">
          <thead className="bg-white text-xs text-gray-500 ">
            <tr>
              <th className="px-3 py-2">
                <label className="inline-flex items-center ">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    onChange={toggleSelectAll}
                    checked={pageData.length > 0 && pageData.every((r) => selected.has(r.orderId))}
                    aria-label="Select all on page"
                  />
                </label>
              </th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <span>Order ID</span>
                  <button title="Sort by Order ID" onClick={() => setSortAsc((s) => !s)} className="text-gray-400 hover:text-gray-600">
                    <ArrowUpDown size={14} />
                  </button>
                </div>
              </th>

              <th className="px-3 py-2 hidden md:table-cell">User</th>
              <th className="px-3 py-2 hidden md:table-cell">Project</th>
              <th className="px-3 py-2 hidden md:table-cell">Address</th>

              <th className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span className="ml-1">Date</span>
                </div>
              </th>

              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {pageData.map((row) => {
              const isSelected = selected.has(row.orderId);
              return (
                <tr
                  key={row.orderId}
                  className={`text-sm ${isSelected ? "bg-gray-50" : ""} hover:bg-gray-50 transition`}
                >
                  <td className="px-3 py-1 align-middle">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={isSelected}
                      onChange={() => toggleSelect(row.orderId)}
                      aria-label={`Select ${row.orderId}`}
                    />
                  </td>

                  <td className="px-3 py-2 align-middle whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{row.orderId}</div>
                  </td>

                  <td className="px-3 py-2 align-middle hidden md:table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700 overflow-hidden">
                        {row.avatar && row.avatar.startsWith("http") ? (
                          <img src={row.avatar} alt={row.user} className="w-full h-full object-cover" />
                        ) : (
                          row.avatar || row.user?.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{row.user}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-2 align-middle hidden md:table-cell">
                    <div className="text-sm text-gray-700">{row.project}</div>
                  </td>

                  <td className="px-3 py-2 align-middle hidden md:table-cell">
                    <div className="text-sm text-gray-700">{row.address}</div>
                  </td>

                  <td className="px-3 py-2 align-middle whitespace-nowrap">
                    <div className="text-sm text-gray-700">{row.dateLabel}</div>
                  </td>

                  <td className="px-3 py-2 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <StatusDot status={row.status} />
                      <div className="text-sm text-gray-700">{row.status}</div>
                    </div>
                  </td>
                </tr>
              );
            })}

            {pageData.length === 0 && (
              <tr>
                <td colSpan="7" className="px-3 py-6 text-center text-sm text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (right aligned as in larger screenshot) */}
      <div className="flex items-center justify-end mt-4">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-gray-50 transition"
            onClick={() => changePage(Math.max(1, pageSafe - 1))}
            disabled={pageSafe === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">{renderPaginationButtons()}</div>

          <button
            className="p-2 rounded-md hover:bg-gray-50 transition"
            onClick={() => changePage(Math.min(totalPages, pageSafe + 1))}
            disabled={pageSafe === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

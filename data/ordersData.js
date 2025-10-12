// src/data/ordersData.js
// 80 mock orders; human-readable names and fields

const firstNames = [
  "Natalie","Kate","Drew","Orlando","Andi","Marcus","Olivia","Liam","Ava","Noah",
  "Maya","Ethan","Sophia","Lucas","Isla","Henry","Zoe","Jack","Chloe","Owen"
];

const lastNames = [
  "Craig","Morrison","Cano","Diggs","Lane","Lee","Brown","Walker","Johnson","Smith",
  "Green","Taylor","Hughes","Adams","Bennett","Young","King","Scott","Brooks","Fox"
];

const projects = [
  "Landing Page","CRM Admin pages","Client Project","Admin Dashboard","App Landing Page",
  "Marketing Site","Ecommerce Store","Mobile App","Design System","Campaign Microsite"
];

const addresses = [
  "Meadow Lane Oakland","Larry San Francisco","Bagwell Avenue Ocala","Washburn Baton Rouge",
  "Nest Lane Olivette","Oakridge St, Seattle","Sunset Blvd, Los Angeles","Pine Street, Denver",
  "Maple Ave, Austin","Elm Rd, Portland"
];

const statuses = ["In Progress","Complete","Pending","Approved","Rejected"];

function initials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

function dateLabelForIndex(i) {
  // variety across rows
  const r = i % 7;
  if (r === 0) return { label: "Just now", iso: new Date().toISOString() };
  if (r === 1) return { label: "A minute ago", iso: new Date(Date.now() - 60 * 1000).toISOString() };
  if (r === 2) return { label: "1 hour ago", iso: new Date(Date.now() - 60 * 60 * 1000).toISOString() };
  if (r === 3) return { label: "Yesterday", iso: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() };
  const daysAgo = 2 + (i % 30);
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const opt = { year: "numeric", month: "short", day: "numeric" };
  return { label: d.toLocaleDateString(undefined, opt), iso: d.toISOString() };
}

const orders = Array.from({ length: 80 }, (_, idx) => {
  const i = idx + 1;
  const first = firstNames[idx % firstNames.length];
  const last = lastNames[idx % lastNames.length];
  const user = `${first} ${last}`;
  const avatar = initials(user);
  const orderId = `#CM${9800 + i}`; // #CM9801 .. #CM9880
  const project = projects[idx % projects.length];
  const address = addresses[idx % addresses.length];
  const status = statuses[idx % statuses.length];
  const date = dateLabelForIndex(idx);
  return {
    orderId,
    user,
    avatar,
    project,
    address,
    status,
    dateLabel: date.label,
    dateISO: date.iso
  };
});

export default orders;

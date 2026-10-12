const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const order = [];
const orderPanel = document.getElementById('orderPanel');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');
function renderOrder() {
  orderItems.innerHTML = '';
  order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — $${item.price}`;
    orderItems.appendChild(li);
  });
  orderTotal.textContent = '$' + order.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  orderPanel.hidden = order.length === 0;
}
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    order.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    renderOrder();
    orderPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
document.getElementById('clearOrder').addEventListener('click', () => { order.length = 0; renderOrder(); });

const dateInput = document.getElementById('date');
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localDate;
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('reservationForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const message = document.getElementById('formMessage');
  message.textContent = `Thanks, ${data.name}! Your reservation request for ${data.guests} on ${data.date} at ${data.time} has been prepared. This demo does not send it to a restaurant yet.`;
  event.currentTarget.reset();
  dateInput.min = localDate;
});


import { useState } from "react";
import "./App.css";

// Отдельный компонент одного товара
function ShoppingItem({ item, onDelete }) {
  return (
    <div className="shopping-item">
      <div className="item-info">
        <span className="item-name">{item.name}</span>
        <span className="item-price">
          {item.price.toLocaleString("ru-RU")} сом
        </span>
      </div>

      <button
        className="delete-button"
        onClick={() => onDelete(item.id)}
        aria-label={`Удалить ${item.name}`}
      >
        Удалить
      </button>
    </div>
  );
}

// Главный компонент приложения
function App() {
  // State: список всех покупок
  const [items, setItems] = useState([]);

  // State: значения полей ввода
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Добавление нового товара
  function addItem(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (
      !trimmedName ||
      price.trim() === "" ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      alert("Введите название товара и корректную цену.");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      name: trimmedName,
      price: numericPrice,
    };

    setItems((currentItems) => [...currentItems, newItem]);

    setName("");
    setPrice("");
  }

  // Удаление товара по его id
  function deleteItem(id) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  // Подсчёт общей стоимости
  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <main className="app">
      <section className="shopping-card">
        <div className="header">
          <span className="basket-icon">🛒</span>
          <h1>Мой список покупок</h1>
          <p>Добавляй товары и следи за расходами</p>
        </div>

        <form className="shopping-form" onSubmit={addItem}>
          <label htmlFor="product-name">Название товара</label>
          <input
            id="product-name"
            type="text"
            placeholder="Например, Хлеб"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="product-price">Цена (сом)</label>
          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Например, 50"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />

          <button className="add-button" type="submit">
            + Добавить товар
          </button>
        </form>

        <div className="list-header">
          <h2>Список товаров</h2>
          <span className="item-count">{items.length}</span>
        </div>

        <div className="items-list">
          {items.length === 0 ? (
            <p className="empty-message">
              Список пуст. Добавь свой первый товар!
            </p>
          ) : (
            items.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                onDelete={deleteItem}
              />
            ))
          )}
        </div>

        <div className="total">
          <div>
            <span className="total-label">Общая стоимость</span>
            <span className="total-hint">
              Всего товаров: {items.length}
            </span>
          </div>

          <strong>
            {total.toLocaleString("ru-RU", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{" "}
            сом
          </strong>
        </div>
      </section>

      <footer>Список покупок • React</footer>
    </main>
  );
}

export default App;

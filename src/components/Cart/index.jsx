import React, { useState } from "react";
import ReceiptModal from "../ReceiptModal";
import "./cart.css";

export default function Cart(props) {
  const { cartItems, onAdd, onRemove, onDelete, onCancel, setCrtItems } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalQty = cartItems.reduce((a, c) => a + c.qty, 0);
  const vatTax = (itemsPrice * 10) / 100;
  const discount = (itemsPrice * 10) / 100;
  const totalPrice = itemsPrice + vatTax - discount;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCrtItems([]);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "myModal") {
      closeModal();
    }
  };
  return (
    <div className="container">
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>PRODUCTS</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
        </table>
        <div className="scrollable-body">
          <table>
            <tbody>
              {cartItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="emptyCart">
                    THERE ARE NO PRODUCTS
                  </td>
                </tr>
              )}
              {cartItems.map((item) => (
                <tr key={item.id} className="productStyle">
                  <td onClick={() => onDelete(item)}>
                    <div className="deleteBtn">x</div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="quantity">
                      <button
                        onClick={() => onRemove(item)}
                        disabled={item.qty === 1}
                      > - </button>
                      <h3> {item.qty} </h3>
                      <button onClick={() => onAdd(item)}> + </button>
                    </div>
                  </td>
                  <td className="tdEnd">
                    {(item.price * item.qty).toFixed(3)}EUR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed-buttons">
        <div>
          <table>
            <thead>
              <tr>
                <th>Sub Total</th>
                <td>{itemsPrice.toFixed(3)}EUR</td>
                <td className="tdEnd">{totalQty} items</td>
              </tr>
              <tr>
                <th>VAT tax</th>
                <td>10%</td>
                <td className="tdEnd">{vatTax.toFixed(3)}EUR</td>
              </tr>
              <tr>
                <th>Discount</th>
                <td>10%</td>
                <td className="tdEnd">{discount.toFixed(3)}EUR</td>
              </tr>
              <tr>
                <th>Total</th>
                <td colSpan={2} className="totalPrice">
                  {totalPrice.toFixed(3)}EUR
                </td>
              </tr>
            </thead>
          </table>
          <div className="finalBtn">
            <button className="cancel-btn" onClick={onCancel}>
              CANCEL SALE
            </button>
            <button
              className="proceed-btn"
              onClick={openModal}
              disabled={totalQty === 0}
            >
              PROCESS SALE
            </button>
          </div>
          {isModalOpen && (
            <ReceiptModal
              cartItems={cartItems}
              totalQty={totalQty}
              totalPrice={totalPrice}
              closeModal={closeModal}
              handleOutsideClick={handleOutsideClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

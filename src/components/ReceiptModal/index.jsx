import React from "react";

const ReceiptModal = ({cartItems,totalQty,totalPrice,closeModal,handleOutsideClick}) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return (
    <div class="modal" onClick={handleOutsideClick}>
      <div class="modal-content">
        <div class="header">
          <div class="title">Receipt</div>
        </div>
        <h3 className="saleNo">Sale No .:.: 00102</h3>
        <h5>Date: {formattedDate}</h5>
        <table>
          <thead>
            <th>#</th>
            <th>Products</th>
            <th className="tdEnd">Quantity</th>
            <th className="tdEnd">SubTotal</th>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td className="tdEnd">{item.qty}</td>
                <td className="tdEnd">{(item.price * item.qty).toFixed(3)}</td>
              </tr>
            ))}
            <tr>
              <td className="tdEnd" colSpan={4}>
                EUR
              </td>
            </tr>
          </tbody>
        </table>
        <hr style={{ border: "1px solid lightGrey", margin: 0 }} />
        <table>
          <tr>
            <td>Total Items</td>
            <td>{totalQty}</td>
            <td>Total</td>
            <td className="tdEnd">{totalPrice.toFixed(3)}EUR</td>
          </tr>
          <hr style={{ border: "1px solid lightGrey", margin: 0 }} />
          <tr>
            <td colSpan={2}></td>
            <td>Discount</td>
            <td className="tdEnd">10%</td>
          </tr>
          <hr style={{ border: "1px solid lightGrey", margin: 0 }} />
          <tr>
            <td colSpan={2}></td>
            <td>VAT</td>
            <td className="tdEnd">10%</td>
          </tr>
        </table>
        <button class="modal-btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};
export default ReceiptModal;
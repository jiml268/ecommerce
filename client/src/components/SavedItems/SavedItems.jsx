import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/userHooks";
import { useCart } from "../../hooks/cartHooks";
import { getCart } from "../../redux/cart/cartOperators";
import {
  showSaved,
  removedItem,
  addFromSaved,
} from "../../redux/cart/cartOperators";
import css from "./savedItems.module.css";
import { Modal, Typography, Button, Box } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SavedItems = () => {
  const dispatch = useDispatch();
  const { getUserId } = useAuth();
  const { getCartID, getSavedItems, getSavedImages, getAllCartItems } =
    useCart();
  const [open, setOpen] = useState(false);
  const [currentSku, setcurrentSku] = useState(null);
  useEffect(() => {
    const getAllsaved = async () => {
      await dispatch(showSaved({ id: getUserId }));
    };

    getAllsaved();
  }, [dispatch, getUserId]);

  const removeClick = async (e) => {
    await dispatch(removedItem({ id: getUserId, sku: e.target.value }));
    await dispatch(showSaved({ id: getUserId }));
  };

  const addClick = async (item) => {
    setcurrentSku(item.sku);
    const index = getAllCartItems.findIndex((obj) => obj.sku === item.sku);
    if (index === -1) {
      await dispatch(
        addFromSaved({
          cartNun: getCartID,
          sku: item.sku,
          quantity: item.quantity < item.Stock ? item.quantity : item.Stock,
          id: getUserId,
        })
      );
      const currentCart = { cartID: getCartID };
      await dispatch(getCart(currentCart));
      await dispatch(removedItem({ id: getUserId, sku: item.sku }));
      await dispatch(showSaved({ id: getUserId }));
    } else {
      setOpen(true);
    }
  };

  const handleClose = async (e) => {
    setOpen(false);
    console.log(e.target.value);
    console.log(e.target.name);

    if (e.target.name === "yes") {
      await dispatch(removedItem({ id: getUserId, sku: currentSku }));
      await dispatch(showSaved({ id: getUserId }));
    }
    setcurrentSku(null);
  };

  return (
    <>
      {getSavedItems && getSavedItems.length > 0 && (
        <div className={css.produceSection}>
          <p>Saved Items</p>
          {getSavedItems.map((item, index) => {
            const imageindex = getSavedImages.findIndex(
              (iteminfo) =>
                iteminfo.ProductID === item.ProductID &&
                iteminfo.colorID === item.colorID
            );
            const showimage =
              imageindex >= 0
                ? window.location.origin +
                  `/images/${getSavedImages[imageindex].imageName}`
                : `/images/Image-Coming-Soon.png}`;
            return (
              <div key={index}>
                <div key={index} className={css.productInfo}>
                  <div className={css.itemSection}>
                    <div className={css.imageSection}>
                      <img
                        src={showimage}
                        alt="product image"
                        className={css.productImage}
                      />
                    </div>
                    <div className={css.infoSection}>
                      <h3 className={css.infoText}>{item.ProductName}</h3>
                      {item.colorName && (
                        <p className={css.infoText}>Color: {item.colorName}</p>
                      )}
                      {item.sizeName && (
                        <p className={css.infoText}>Size: {item.sizeName}</p>
                      )}
                    </div>
                    <div className={css.priceSection}>
                      <h4>
                        $
                        {!item.salepercent
                          ? (item.price * item.quantity)
                              .toFixed(2)
                              .toLocaleString("en-US")
                          : (
                              (item.price -
                                (item.price * item.salepercent).toFixed(2)) *
                              item.quantity
                            ).toLocaleString("en-US")}
                      </h4>
                      {item.quantity > 1 && (
                        <p>
                          {" "}
                          $
                          {item.price -
                            (item.price * item.salepercent)
                              .toFixed(2)
                              .toLocaleString("en-US")}{" "}
                          each{" "}
                        </p>
                      )}
                      {item.salepercent && (
                        <p className={css.sale}>${item.price} each</p>
                      )}

                      {item.salepercent && (
                        <p>
                          <span className={css.saveText}>You save: </span>$
                          {(
                            (item.price * item.salepercent).toFixed(2) *
                            item.quantity
                          )
                            .toFixed(2)
                            .toLocaleString("en-US")}
                        </p>
                      )}
                      <div>
                        <div>
                          <button type="button" disabled={true}>
                            Quantity: {item.quantity}
                          </button>
                        </div>

                        <div className={css.savedButtons}>
                          <button
                            className={css.buttonOptions}
                            type="button"
                            onClick={removeClick}
                            value={item.sku}
                          >
                            {" "}
                            Remove
                          </button>
                          <button
                            className={css.buttonOptions}
                            type="button"
                            onClick={() => addClick(item)}
                            value={item.sku}
                          >
                            {" "}
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This item is already in the cart.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to remove it from the save items
          </Typography>
          <Button onClick={handleClose} name="yes" value={currentSku}>
            Yes
          </Button>
          <Button onClick={handleClose} name="no" value={currentSku}>
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SavedItems;

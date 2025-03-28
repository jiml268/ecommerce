import PropTypes from "prop-types";
import css from "./ProductInfo.module.css";
import { useProduct } from "../../hooks/productHooks";
import { useDispatch } from "react-redux";
import {
  setCurrentColor,
  setCurrentSize,
} from "../../redux/products/productsSlice";
import {
  addquantity,
  addtocart,
  decreasequantity,
  getCartByCartID,
} from "../../redux/cart/cartOperators";
import { useAuth } from "../../hooks/userHooks";
import { useCart } from "../../hooks/cartHooks";
import { nanoid } from "nanoid";
import { setCartID } from "../../redux/cart/cartSlice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function ProductInfo({ currentItem }) {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  const dispatch = useDispatch();
  const { getCurrentColor, getCurrentSize } = useProduct();
  const { getUserId } = useAuth();
  const { getCartID, getCurrentCart } = useCart();
  const [uniqueColors, setUniqueColors] = useState(null);
  const [uniqueSizes, setUniqueSizes] = useState(null);
  const [uniqueSpecs, setUniqueSpecs] = useState(null);

  useEffect(() => {
    const colors = [
      ...new Set(
        currentItem
          .filter((item) => item.colorID !== null)
          .map((item) => `${item.colorID}-${item.colorName}`)
      ),
    ];
    setUniqueColors(
      colors.map((combination) => {
        const [colorID, colorName] = combination.split("-");
        return { colorID, colorName };
      })
    );

    setUniqueSizes([
      ...new Set(
        currentItem
          .map((item) => item.sizeName)
          .filter((sizeName) => sizeName !== null)
      ),
    ]);

    const specs = [
      ...new Set(
        currentItem
          .filter((item) => item.SpecName !== null)
          .map((item) => `${item.SpecName}-${item.SpecValue}`)
      ),
    ];
    setUniqueSpecs(
      specs.map((combination) => {
        const [SpecName, SpecValue] = combination.split("-");
        return { SpecName, SpecValue };
      })
    );
  }, [currentItem]);

  const colorClick = async (e) => {
    await dispatch(setCurrentColor(e.target.value));
  };

  const sizeClick = async (e) => {
    await dispatch(setCurrentSize(e.target.value));
  };

  const createColorButtons = () => {
    return (
      <div className={css.colorSection}>
        {uniqueColors.map((item, index) => {
          let quant = 0;

          if (getCurrentSize === null) {
            quant = currentItem.reduce((sum, cur) => {
              if (cur.colorID === +item.colorID) {
                return sum + cur.stock;
              }

              return sum;
            }, 0);
          } else {
            const findindex = currentItem.findIndex(
              (iteminfo) =>
                iteminfo.colorID === +item.colorID &&
                iteminfo.sizeName === getCurrentSize
            );

            if (findindex !== -1) {
              quant = currentItem[findindex].stock;
            }
          }
          return (
            <div key={index}>
              <button
                className={`${css.colorButton} ${
                  +item.colorID === getCurrentColor ? css.buttonactive : ""
                } ${quant === 0 ? css.button_out_of_stock : ""}`}
                key={index}
                value={item.colorID}
                onClick={colorClick}
              >
                {item.colorName}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const createSizeButtons = () => {
    return (
      <div className={css.sizeSection}>
        {uniqueSizes.map((item, index) => {
          let quant = 0;
          if (getCurrentColor === null) {
            quant = currentItem.reduce((sum, cur) => {
              if (cur.sizeName === item) {
                return sum + cur.stock;
              }
              return sum;
            }, 0);
          } else {
            const findindex = currentItem.findIndex(
              (iteminfo) =>
                iteminfo.sizeName === item &&
                iteminfo.colorID === getCurrentColor
            );
            if (findindex !== -1) {
              quant = currentItem[findindex].stock;
            }
          }
          return (
            <div key={index}>
              <button
                className={`${css.sizeButton} ${
                  item === getCurrentSize ? css.buttonactive : ""
                } ${quant === 0 ? css.button_out_of_stock : ""}`}
                key={index}
                value={item}
                onClick={sizeClick}
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const addClicked = async (e) => {
    if (
      (uniqueColors.length > 0 && getCurrentColor === "") ||
      (uniqueSizes.length > 0 && getCurrentSize === "")
    ) {
      toast.warning("Please choose a color and size", toastOptions);
      return;
    }
    const alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const getSKU = e.target.value;
    let holdCartID = "";
    if (getCartID === "") {
      holdCartID = nanoid(alphabet, 10);
    } else {
      holdCartID = getCartID;
    }
    const additem = { sku: getSKU, cartID: holdCartID, id: getUserId };

    await dispatch(addtocart(additem));
    await dispatch(setCartID(holdCartID));
    await dispatch(getCartByCartID(additem));
    // await dispatch(setCurrentSize(null))
    // await dispatch(setCurrentColor(null))
  };

  const changeClicked = async (e) => {
    const getSKU = e.target.value;

    const changeQty = { sku: getSKU, cartID: getCartID, id: getUserId };
    if (e.target.name === "increase") {
      await dispatch(addquantity(changeQty));
    }
    if (e.target.name === "decrease") {
      await dispatch(decreasequantity(changeQty));
    }
    await dispatch(getCartByCartID(changeQty));
  };

  const createCartButtons = () => {
    let sku = "";
    let inStock = 0;
    let cartQnt = 0;
    let getsku = null;

    getsku = currentItem.findIndex(
      (iteminfo) =>
        iteminfo.sizeName === getCurrentSize &&
        iteminfo.colorID === getCurrentColor
    );

    if (getsku >= 0) {
      sku = currentItem[getsku].sku;
      inStock = currentItem[getsku].stock;
    } else {
      sku = currentItem[0].sku;
      inStock = currentItem[0].stock;
    }
    if (getCurrentCart) {
      const inCart = getCurrentCart.findIndex(
        (iteminfo) => iteminfo.sku === sku
      );
      if (inCart >= 0) {
        cartQnt = getCurrentCart[inCart].quantity;
      }
    }
    {
      if (getsku < 0 || inStock === 0) {
        return (
          <div>
            <p className={css.notAvailable}>Item is unavalable</p>
          </div>
        );
      } else {
        return (
          <div className={css.cartButtons}>
            <button
              type="button"
              onClick={changeClicked}
              value={sku}
              name="decrease"
              className={`${css.changeQnty} ${
                cartQnt === 0 ? css.hideButton : ""
              }`}
            >
              {" "}
              -
            </button>
            <button
              type="button"
              onClick={addClicked}
              value={sku}
              className={`${css.addtocart} ${cartQnt > 0 ? css.incart : ""}`}
            >
              {cartQnt === 0 ? "Add to Cart" : cartQnt}
            </button>
            <button
              type="button"
              onClick={changeClicked}
              value={sku}
              name="increase"
              className={`${css.changeQnty} ${
                cartQnt === 0 || cartQnt >= inStock ? css.hideButton : ""
              }`}
            >
              {" "}
              +
            </button>
          </div>
        );
      }
    }
  };

  return (
    <div>
      {currentItem.length > 0 && (
        <>
          {createCartButtons()}

          <h2> {currentItem[0].ProductName}</h2>
          <h3>{currentItem[0].Description}</h3>
          {currentItem.length > 0 && (
            <ul>
              {uniqueSpecs && uniqueSpecs.length > 0 && (
                <div>
                  {uniqueSpecs.map((item, index) => (
                    <div key={index}>
                      {item.SpecName !== null && (
                        <li key={index}>
                          {item.SpecName} {item.SpecValue}
                        </li>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ul>
          )}
          {uniqueColors && uniqueColors.length > 0 && (
            <div className={css.colorSection}>{createColorButtons()}</div>
          )}

          {uniqueSizes && uniqueSizes.length > 0 && (
            <div className={css.sizeSection}>{createSizeButtons()}</div>
          )}
        </>
      )}
    </div>
  );
}

ProductInfo.propTypes = {
  currentItem: PropTypes.array,
  uniqueColor: PropTypes.array,
  uniqueSize: PropTypes.array,
  arraySize: PropTypes.number,
};

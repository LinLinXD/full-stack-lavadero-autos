const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0)
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)

  return (
    <div className="foot-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src="/icons/add_icon_white.png"
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src="/icons/remove_icon_red.png"
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src="/icons/add_icon_green.png"
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src="/icons/rating_stars.png" alt="rating" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

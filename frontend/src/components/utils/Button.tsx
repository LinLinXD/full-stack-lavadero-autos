
type ButtonType = {
    children: string,
    className: string,
    onClick?: () => void,
    type?: "submit" | "reset" | "button" 
}

export const Button = ({children, className, onClick, type = "button"}: ButtonType) => {
    const onClickEvent = () => {
        if (onClick) {
            onClick();
        }
    }

  return (
    <button className={className} onClick={onClickEvent} type={type}>{children}</button>
  )
}




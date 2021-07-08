function Door({ value, onClick, open }) {
  return (
    <div onClick={onClick} className={open ? "door open" : "door closed"}>
      {open ? value : "?"}
    </div>
  )
}

export default Door;
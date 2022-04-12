const Category = () => {
  return <div className="w-full h-10 leading-10 text-left align-middle hover:bg-blue-50 px-3 cursor-pointer">家电</div>
}

const Categories = () => {
  return (
    <div className="bg-white w-full h-full rounded-md flex-col content-center">
      <div className="w-full text-center bg-gray-50 py-2 font-bold">商品分类</div>
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
    </div>
  )
}

export default Categories

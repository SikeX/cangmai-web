function FootItem({ title }) {
  return <span className="my-auto px-4 cursor-pointer hover:underline">{title}</span>
}

function Footer() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-44 px-16 py-4">
        <img w-full h-full src="https://s3.bmp.ovh/imgs/2022/04/21/c2554a1c84ff353b.png" alt="aaa" />
      </div>
      <div className="flex flex-col w-full bg-blue-800 divide-y-2 divide-blue-900 text-white text-sm">
        <div className="flex divide-x-2 divide-blue-900 justify-center py-8">
          <FootItem title="关于我们" />
          <FootItem title="联系我们" />
          <FootItem title="操作指南" />
        </div>
        <div className="py-8 mx-auto">版权所有©505宿舍</div>
      </div>
    </div>
  )
}

export default Footer

import PropTypes from 'prop-types';

export default function ProductMenu({
  state,
  productList = [], // 確保 productList 有預設值，避免 .map() 遇到 null/undefined
  tempProduct,
  openProductModal,
  openDeleteModal,
  handleChangeOption,
  setTempProduct,
  setTempImgUrl,
  setState,
}) {
  return (
    <>
      {/* 標題列 */}
      <div className='row'>
        <div className='col-6 mt-2'>
          <kbd>商品列表</kbd>
        </div>
        <div className='col-6'>
          <button className="btn btn-outline-success me-2 float-end" type="button" id="checkBtn" disabled={state}
            onClick={() => {
              openProductModal("create")
              setState(true)
            }}>新增商品</button>
        </div>
      </div>

      {/* 桌面版 Table */}
      <table className="table mt-3 table-hover d-none d-md-table">
        <thead>
          <tr className="table-info border-2">
            <th scope="col">圖片</th>
            <th scope="col">商品名稱</th>
            <th scope="col" className="text-center">分類</th>
            <th scope="col" className="text-center">原價</th>
            <th scope="col" className="text-center">售價</th>
            <th scope="col" className="text-center">是否啟用</th>
            <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {productList?.map((item) => (
            <tr key={item.id}>
              <td style={{ width: '80px' }}>
                <img
                  src={item.imageUrl}
                  alt="商品圖"
                  className="img-thumbnail"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              </td>
              <td>{item.title}</td>
              <td className="text-center"><span className="badge bg-danger">{item.category}</span></td>
              <td className='text-center text-primary'>{item.origin_price}</td>
              <td className='text-center text-primary'>{item.price}</td>
              <td className={`text-center ${item.is_enabled === 1 ? "text-dark" : "text-danger"}`}>
                {item.is_enabled === 1 ? "已啟用" : "已停用"}{" "}
                <select value={item.is_enabled === 1 ? "Y" : "N"} onChange={(e) => handleChangeOption(e, item)}>
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </select>
              </td>
              <td>
                <div className="btn-group float-end">
                  <button type="button" className={`btn ${item?.id === tempProduct?.id ? "btn-secondary btn-sm" : "btn-outline-secondary btn-sm"}`}
                    onClick={() => {
                      setTempProduct(item)
                      setTempImgUrl(item.imageUrl)
                    }}>檢視商品 <i className="fas fa-search"></i>
                  </button>
                  <button type="button" className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      openProductModal("edit", item)
                      setState(true)
                    }}>編輯 <i className="fas fa-edit"></i></button>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => openDeleteModal(item)}>
                    刪除 <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 手機版卡片列表 */}
      <div className="d-block d-md-none mt-3">
        {productList?.map((item) => (
          <div key={item.id} className="card mb-3 shadow-sm">
            <div className="card-body p-2">
              <div className="d-flex align-items-start">
                {/* 圖片 */}
                <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
                  <img
                    src={item.imageUrl}
                    alt="商品圖"
                    className="img-fluid rounded object-fit-cover w-100 h-100"
                  />
                </div>

                {/* 文字資訊 */}
                <div className="flex-grow-1 pe-2 ps-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h5 className="card-title mb-0">{item.title}</h5>
                    <span className="badge bg-danger">{item.category}</span>
                  </div>
                  <p className="mb-1 text-primary">原價：{item.origin_price}</p>
                  <p className="mb-1 text-primary">售價：{item.price}</p>
                  <div className="d-flex align-items-center mb-1">
                    <span className={`me-2 ${item.is_enabled === 1 ? 'text-dark' : 'text-danger'}`}>
                      狀態：{item.is_enabled === 1 ? '已啟用' : '已停用'}
                    </span>
                    <select
                      className="form-select form-select-sm w-auto"
                      value={item.is_enabled === 1 ? 'Y' : 'N'}
                      onChange={(e) => handleChangeOption(e, item)}
                    >
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 按鈕區 */}
              <div className="btn-group d-flex flex-wrap mt-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm flex-fill"
                  onClick={() => {
                    openProductModal('edit', item);
                    setState(true);
                  }}
                >
                  編輯 <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm flex-fill"
                  onClick={() => openDeleteModal(item)}
                >
                  刪除 <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// 定義PropTypes
ProductMenu.propTypes = {
  state: PropTypes.bool,
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    origin_price: PropTypes.number,
    price: PropTypes.number,
    is_enabled: PropTypes.number,
    imageUrl: PropTypes.string,
  })),
  tempProduct: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  openProductModal: PropTypes.func,
  openDeleteModal: PropTypes.func,
  handleChangeOption: PropTypes.func,
  setTempProduct: PropTypes.func,
  setTempImgUrl: PropTypes.func,
  setState: PropTypes.func,
}
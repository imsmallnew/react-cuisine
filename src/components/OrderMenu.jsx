import PropTypes from 'prop-types';

export default function OrderMenu({
  state,
  orderList,
  targetOrder,
  openOrderModal,
  handleChangeOption,
  setTargetOrder,
}) {
  return (
    <>
      {/* 桌面版 Table */}
      <table className="table mt-2 table-hover d-none d-md-table">
        <thead>
          <tr className="table-success border-2">
            <th>訂單號碼</th>
            <th>訂單日期</th>
            <th>訂購人</th>
            <th className="text-center">付款狀態</th>
            <th className="text-center">訂單金額</th>
            <th className="text-center">訂單內容</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {orderList?.map((item) => {
            return (
              <tr key={item.id}>
                <td className="text-break">{item.id}</td>
                <td>{new Date(item.create_at * 1000).toLocaleString("zh-TW", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false // 24 小時制
                })}</td>
                <td>{item.user?.name}</td>
                <td className={`text-center fw-bold ${item.is_paid ? "text-success" : "text-danger"}`}>
                  {item.is_paid ? "已付款" : "未付款"}
                  <select
                    value={item.is_paid ? "Y" : "N"}
                    onChange={(e) => {
                      const confirmChange = window.confirm("確定要變更付款狀態嗎？");
                      if (confirmChange) {
                        handleChangeOption(e, item);
                      }
                    }}
                    className="ms-2"
                    disabled={item?.is_paid}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </td>
                <td className='text-center text-primary fw-bold'>{item.total} 元</td>
                <td className="text-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className={`btn ${item?.id === targetOrder?.id ? "btn-secondary btn-sm" : "btn-outline-secondary btn-sm"}`}
                      disabled={state}
                      onClick={() => {
                        setTargetOrder(item)
                        openOrderModal(item)
                      }}><i className="fas fa-search"></i>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* 手機版卡片顯示 */}
      <div className="d-block d-md-none mt-3">
        {orderList?.map((item) => (
          <div key={item.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className={`card-title mb-1 fw-bold ${item.is_paid ? "text-success" : "text-danger"}`}>訂單號碼: {item.id}</h5>
              <p className="mb-1">訂單日期: {new Date(item.create_at * 1000).toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
              })}</p>
              <p className="mb-1">訂購人: {item.user?.name}</p>
              <p className="mb-1 text-left">訂單金額: <span className="text-primary fw-bold">{item.total} 元</span></p>
              <div className="d-flex align-items-center">
                <p className={`fw-bold ${item.is_paid ? "text-success" : "text-danger"}`}>
                  付款狀態: {item.is_paid ? "已付款" : "未付款"}
                </p>
                <select
                  className="form-select form-select-sm w-25 mb-2 ms-2"
                  value={item.is_paid ? "Y" : "N"}
                  style={{ verticalAlign: 'middle', marginTop: '-5px' }}
                  onChange={(e) => {
                    const confirmChange = window.confirm("確定要變更付款狀態嗎？");
                    if (confirmChange) {
                      handleChangeOption(e, item);
                    }
                  }}
                  disabled={item?.is_paid}
                >
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                </select>
              </div>

              {/* 按鈕區 */}
              <div className="btn-group d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className={`btn ${item?.id === targetOrder?.id ? "btn-secondary" : "btn-secondary"} btn-sm`}
                  disabled={state}
                  onClick={() => {
                    setTargetOrder(item);
                    openOrderModal(item);
                  }}
                >
                  檢視訂單 <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 定義PropTypes
OrderMenu.propTypes = {
  state: PropTypes.bool.isRequired,
  orderList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      create_at: PropTypes.number.isRequired,
      is_paid: PropTypes.bool.isRequired,
      total: PropTypes.number.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string,
      })
    })
  ).isRequired,
  targetOrder: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  openOrderModal: PropTypes.func.isRequired,
  handleChangeOption: PropTypes.func.isRequired,
  setTargetOrder: PropTypes.func.isRequired,
}
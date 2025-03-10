import PropTypes from 'prop-types';

export default function OrderModal({
    orderModalRef,
    targetOrder,
    closeOrderModal,
    handleChangeOption
}) {
    const productsArray = Object.values(targetOrder?.products || {});
    
    return (
        <div
            className="modal fade"
            ref={orderModalRef}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog" style={{ maxWidth: "720px" }}>
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header bg-success">
                        <h5 className="modal-title text-white" id="exampleModalLabel">
                            訂單內容: {targetOrder.id}
                        </h5>
                        <button
                            type="button"
                            className="btn-close bg-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => closeOrderModal()}
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <div className="row">
                            {/* 左側：收件資訊 */}
                            <div className="col-md-5">
                                <div
                                    className="p-3 pb-0 rounded"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                                >
                                    <div className="mb-2">
                                        <label className="form-label fw-bold text-dark">收件人姓名</label>
                                        <p className="text-break text-primary">{targetOrder?.user?.name}</p>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label fw-bold text-dark">收件人信箱</label>
                                        <p className="text-break text-primary">{targetOrder?.user?.email}</p>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label fw-bold text-dark">收件人電話</label>
                                        <p className="text-break text-primary">{targetOrder?.user?.tel}</p>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label fw-bold text-dark">收件人地址</label>
                                        <p className="text-break text-primary" style={{ wordBreak: "break-word" }}>
                                            {targetOrder?.user?.address}
                                        </p>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label fw-bold text-dark">總金額</label>
                                        <p className="text-break text-danger fw-bold fs-4">{targetOrder?.total} 元</p>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label fw-bold text-dark">付款狀態</label>
                                        <p className={`text-break fw-bold fs-4 ${targetOrder.is_paid ? "text-success" : "text-danger"}`}>
                                            {targetOrder?.is_paid ? "已付款" : "未付款"}
                                            <select
                                                value={targetOrder.is_paid ? "Y" : "N"}
                                                className="ms-2"
                                                onChange={(e) => {
                                                    const confirmChange = window.confirm("確定要變更付款狀態嗎？");
                                                    if (confirmChange) {
                                                        handleChangeOption(e, targetOrder);
                                                    }
                                                }}
                                                disabled={targetOrder?.is_paid}
                                            >
                                                <option value="Y">Y</option>
                                                <option value="N">N</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 右側：購物清單 */}
                            <div className="col-md-7 mb-3">
                                <div
                                    className="p-3 rounded"
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    {productsArray?.map((cartItem) => (
                                        <div
                                            key={cartItem?.id}
                                            className="d-flex align-items-center border-bottom py-2"
                                        >
                                            <img
                                                src={cartItem?.product?.imageUrl}
                                                className="rounded border border-gold"
                                                alt="商品圖片"
                                                width="100"
                                            />
                                            <div className="ms-3 flex-grow-1">
                                                <h6 className="text-white">{cartItem?.product?.title}</h6>
                                                <small className="text-dark mt-3">
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            數量: {cartItem?.qty}
                                                        </div>
                                                        <div className="col-12 col-md-6 text-end">
                                                            小計: {cartItem?.total} 元
                                                        </div>
                                                    </div>
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success w-100"
                            onClick={() => closeOrderModal()}
                        >
                            關閉
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

// 定義PropTypes
OrderModal.propTypes = {
    orderModalRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    targetOrder: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        is_paid: PropTypes.bool,
        total: PropTypes.number,
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            address: PropTypes.string,
            tel: PropTypes.string,
        }),
        products: PropTypes.objectOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                qty: PropTypes.number.isRequired,
                total: PropTypes.number.isRequired,
                product: PropTypes.shape({
                    title: PropTypes.string,
                    imageUrl: PropTypes.string,
                }),
            })
        ),
    }),
    closeOrderModal: PropTypes.func.isRequired,
    handleChangeOption: PropTypes.func.isRequired,
}
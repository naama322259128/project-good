import EditProductList from "./EditProductList";
import UploadingProducts from "../../new auction/uploading products/UploadingProducts";
import './auctionManager.scss'


//עריכת מוצרים
const EditProducts = () => {
    return (<>
        <EditProductList />
        <UploadingProducts/>
    </>);
}

export default EditProducts;
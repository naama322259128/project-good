import { connect } from 'react-redux';
import PurchasingGroups from './purchasing groups/PurchasingGroups';
import Packages from './pricing packages/Packages';
import { useHistory } from 'react-router-dom';

//תמחור מחירה
//בתוכו קבוצות תמחור, כרטיסים בחבילה

const AuctionPricing = () => {
    const history = useHistory();
    return (
        <>
            <PurchasingGroups />
            <Packages />
            <input type="button" onClick={() => { history.push('/uploadingProducts') }} />
        </>
    );
}

export default AuctionPricing;
import { connect } from 'react-redux';
const SignUp = (props) => {
    //הרשמת משתמש חדש
    let identity = "";
    let password = "";
    let firstName = "";
    let lastName = "";
    let email = "";
    let phone = "";
    let adress = "";
    // createUser = () => {
    //     let userToAdd = { identity, password, firstName, lastName, email, phone, adress };

    // }
    // console.log("aaaaaaa");
    
    return (


        <form>
            <div className="ui equal width form">
                <div className="fields">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" placeholder="Username" onChange={(e) => { identity = e.target.value }} required="true" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" onChange={(e) => { password = e.target.value }} required="true" />
                    </div>
                </div>
                <div className="fields">
                    <div className="field">
                        <label>Identity</label>
                        <input type="text" placeholder="Identity" onChange={(e) => { identity = e.target.value }} required="true" />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" placeholder="Email" onChange={(e) => { email = e.target.value }} required="true" />
                    </div>

                </div>  <div className="fields">
                    <div className="field">
                        <label>Phone</label>
                        <input type="text" placeholder="Phone" onChange={(e) => { phone = e.target.value }} required="true" />
                    </div>
                    <div className="field">
                        <label>Adress</label>
                        <input type="text" placeholder="Adress" onChange={(e) => { adress = e.target.value }} required="true" />
                    </div>

                </div>
                <button className="positive ui button">ok</button>

            </div>


            {/* <input type="submit" value="ok" onClick={} />מציג את אני לא רובוט */}
            {/* <div> */}
            {/* אני לא רובוט */}
            {/* </div> */}


        </form>

    );

}


export default SignUp;
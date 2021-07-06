import React from 'react';
import "./Home.css";
import Product from "./Product"


function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img21/CBCC/Marketing/yadp21/landingpage/PD21_LandingPage_Slot1_Background_CBCC._CB668304648_.png" alt="" />
                <div className="home__row">
                    {/* product */}
                    <Product id= "1" title="The lean startup: How Constant Innovation Creats Radically Successful Businesses Paperback" price={9.99} image="https://upload.wikimedia.org/wikipedia/en/1/11/Lean_Startup.png" rating={5} />
                    {/* product */}
                    <Product id= "2" title="kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl" price={239} image="https://www.kenwoodworld.com/WebImage/Global/Product%20images/Kmix%20products/KMX750_1colour/Kmix_allred_800x600.jpg" rating={5}/>
                </div>
                <div className="home__row">
                    {/* product */}
                    <Product id="3" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor" price={199.99} image="https://img.ebyrcdn.net/893829-861763-800.jpg" rating={5} />
                    {/* product */}
                    <Product id="4" title="Amazon Echo (3rd generation) | Smart Speaker with Alexa, Charcoal Fabric" price={98.99} image="https://www.trustedreviews.com/wp-content/uploads/sites/54/2019/06/Echo-Dot-920x518.png" rating={5} />
                    {/* product */}
                    <Product id="5" title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation) " price={598.99} image="https://www.nicepng.com/png/detail/246-2461711_apple-ipad-pro-apple-12-9-inch-ipad-pro.png" rating={5} />
                </div>
                <div className="home__row">
                    {/* product */}
                    <Product id="6" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 X 1440" price={1094.99} image="https://i.ebayimg.com/images/g/8McAAOSwk-Ne8gOp/s-l400.jpg" rating={5} />
                </div>
            </div>
        </div>
    )
}

export default Home
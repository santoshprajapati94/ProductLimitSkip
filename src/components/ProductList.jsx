import { useEffect, useState } from "react";

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [disablebtn, setDisablebtn] = useState(false);
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/?limit=20&skip=${
          count == 0 ? count : count * 20
        }`
      );
      const result = (await response.json())?.products;
      setProduct(result);

      if (result && result.product && result.product.length) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  console.log(count)
  useEffect(() => {
    fetchProduct();
  }, [count]);

  useEffect(() => {
    if (count == 9) setDisablebtn(true)
  }, [count]);

    if (loading === true) {
      return <div> Loading Data ! Please Wait ...</div>;
    }
    const loadmoredata = () => {
        count === 9 ? count : setCount(count + 1);
      };
  return (
    <div className="container">
        <div className="products-rap ">
      {product && product.length > 0
        ? product.map((item) => (
            
                <div key={item?.id} className="product-container">
                    <img src={item?.thumbnail} alt={item?.title} className="img-product" />
                    <p className="title-product" key={item?.id}>
                    {item?.title}
                    </p>
                </div>
        ))
        : null
    
    }
        </div>
        <div className="more-btn">
            <button
            className="more-data"
            style={{
                backgroundColor:count < 9 ? 'gray' : '#ff0000',
                color:'#fff'
              }}
            disabled={disablebtn}
            onClick={loadmoredata}
        >
            Load More Data
            </button>
            { disablebtn ? <p>complete 194 products</p> : null}
        </div>
      
    </div>
  );
};

export default ProductList;

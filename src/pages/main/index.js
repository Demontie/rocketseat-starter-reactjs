import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";
class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;
    this.setState({ products: docs, productInfo, page });
    console.log(response);
  };

  nextPage = () => {
    const { page, productInfo } = this.state;
    if (page === productInfo.pages) return;
    let pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    let pageNumber = page - 1;
    this.loadProducts(pageNumber);
  };

  render() {
    const { products } = this.state;
    return (
      <div className="products-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            
            <Link to={`/product/${product._id}`} >Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button onClick={this.prevPage}>Anterior</button>
          <button onClick={this.nextPage}>Proximo</button>
        </div>
      </div>
    );
  }
}

export default Main;

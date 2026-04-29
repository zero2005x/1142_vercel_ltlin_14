import styled from 'styled-components';

const Wrapper = styled.div`
  :root {
    /* w5 -- blogs css */
    --primary: #645cff;
    --primary-dark: #3c3799;
    --grey: #64748b;
    --grey-light: #f1f5f9;
    --grey-dark: #0f172a;
    --border-radius: 0.2rem;
  }

  .img {
    width: 100%;
    height: 15rem;
    display: block;
    object-fit: cover;
  }

  .blogs {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 10px;
    color: var(--grey-dark);
    background-color: var(--grey-light);
    padding: 3rem 1.5rem;
  }

  .section-title h2 {
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 1.2rem;
    letter-spacing: 1px;
    font-size: 1.5rem;
  }

  .section-title h3 {
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 1rem;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }

  .blogs-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .blogs-center2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 2rem;
  }

  .blog {
    background-color: white;
    padding: 0.75rem;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.4);
    border-radius: var(--border-radius);
  }

  .blog-content {
    margin-top: 0.5rem;
  }

  .blog-content span {
    text-transform: uppercase;
    color: var(--primary);
    letter-spacing: 1.5px;
    font-size: 0.8rem;
  }

  .blog-content h3 {
    text-transform: capitalize;
    margin: 0.5rem 0;
    letter-spacing: 1px;
    font-size: 1rem;
  }

  .blog-content p {
    color: var(--grey);
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }

  .blog-content a {
    text-transform: capitalize;
    color: var(--primary-dark);
    letter-spacing: 1px;
    font-size: 0.8rem;
  }

  .blog-content .footer {
    display: flex;
    justify-content: space-between;
  }

  .blog-content .btns {
    display: flex;
    justify-content: space-around;
    gap: 5px;
  }

  .btn {
    cursor: pointer;
    color: var(--primary);
    background: #eee;
    border: transparent;
    border-radius: var(--borderRadius);
    padding: 0.15rem 0.3rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    display: inline-block;
  }
  .btn:hover {
    color: var(--primary-dark);
    background-color: #ccc;
    box-shadow: var(--shadow-3);
  }

  .blogs-footer-btns {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }

  .btn-add {
    padding: 0.5rem 1.2rem;
    font-size: 1.2rem;
    color: purple;
    background-color: lightskyblue;
  }

  .clear-all {
    padding: 0.5rem 1.2rem;
    font-size: 1.2rem;
    color: red;
    background-color: pink;
    cursor: pointer;
  }
  .clear-all:hover {
    color: red;
    background: rgba(255, 0, 0, 0.3);
  }

  .load-all {
    padding: 0.5rem 1.2rem;
    font-size: 1.2rem;
    color: blue;
    background-color: lightblue;
    cursor: pointer;
  }

  .load-all:hover {
    color: blue;
    background: rgba(0, 0, 255, 0.3);
  }

  /*
  ================
   item container
  ================
  */

  .item-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    transition: all 0.3s linear;
    padding: 0.25rem 0.25rem 0 0;
    border-radius: all 0.3s linear;
    text-transform: capitalize;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .mt-8 {
    margin-top: 2rem;
  }

  .ml-1 {
    margin-left: 0.25rem;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .edit-btn,
  .delete-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    letter-spacing: 1px;
    cursor: pointer;
    font-size: 0.7rem;
    margin: 0 0.15rem;
    transition: all 0.3s linear;
    padding: 0.2rem 0.4rem;
  }
  .edit-btn {
    color: rgba(0, 0, 255, 0.5);
    background-color: rgba(0, 0, 255, 0.1);
  }
  .edit-btn:hover {
    color: blue;
    background-color: rgba(0, 0, 255, 0.3);
    font-weight: 500;
  }
  .delete-btn {
    color: rgba(255, 0, 0, 0.5);
    background: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.1);
    color: rgba(255, 0, 0, 0.7);
  }
  .delete-btn:hover {
    color: red;
    background: rgba(255, 0, 0, 0.2);
    font-weight: 600;
  }

  /*
  ================
   Alert
  ================
  */
  .alert {
    margin-bottom: 1rem;
    height: 1.25rem;
    display: grid;
    align-items: center;
    text-align: center;
    font-size: 0.7rem;
    border-radius: 0.25rem;
    letter-spacing: 0.1rem;
    text-transform: capitalize;
  }
  .alert-danger {
    color: #721c24;
    background: #f8d7da;
  }
  .alert-success {
    color: #155724;
    background: #d4edda;
  }

  @media screen and (min-width: 550px) {
    .blogs-center {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 800px) {
    .blogs-center {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (min-width: 992px) {
    .blogs-center {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media screen and (min-width: 1200px) {
    .blogs-center {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media screen and (min-width: 1400px) {
    .blogs-center {
      grid-template-columns: repeat(6, 1fr);
    }
  }
`;

export default Wrapper;

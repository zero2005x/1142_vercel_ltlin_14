'use client';

import styled from 'styled-components';

const Wrapper = styled.div`
 
  body {
    background: #e2e8f0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-weight: 400;
    line-height: 1;
    color: #0f172a;
  }
  p {
    margin: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    font-family: var(--headingFont);
    font-weight: 400;
    line-height: 1;
    text-transform: capitalize;
    letter-spacing: 1px;
  }

  h1 {
    font-size: 3.052rem;
  }

  h2 {
    font-size: 2.441rem;
  }

  h3 {
    font-size: 1.953rem;
  }

  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  .text {
    margin-bottom: 1.5rem;
    max-width: 40em;
  }

  small,
  .text-small {
    font-size: 0.875rem;
  }

  a {
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  .img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  /* buttons */

  .btn {
    cursor: pointer;
    color: #fff;
    background: #06b6d4;
    border: transparent;
    border-radius: 0.25rem 1px 1px;
    letter-spacing: 1px;
    padding: 0.375rem 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: 0.3s ease-in-out all;
    text-transform: capitalize;
    display: inline-block;
  }
  .btn:hover {
    background: #0e7490;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),;
  }
  .btn-hipster {
    color: #06b6d4;
    background: #a5f3fc
  }
  .btn-hipster:hover {
    color: #a5f3fc;
    background: #0e7490;
  }
  .btn-block {
    width: 100%;
  }

  /* alerts */
  .alert {
    padding: 0.375rem 0.75rem;
    margin-bottom: 1rem;
    border-color: transparent;
    border-radius: 0.25rem 1px 1px;
  }

  .alert-danger {
    color:  #842029;
    background: #f8d7da
  }
  .alert-success {
    color: #0f5132;
    background: #d1e7dd
  }
  /* form */

  .form {
    width: 90vw;
    max-width: 600px;
    background: #fff;
    border-radius: 0.25rem 1px 1px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
  }
  .form-label {
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: 1px;
  }
  .form-input,
  .form-textarea {
    color: #444;
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem 1px 1px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-textarea {
    height: 7rem;
  }
  ::placeholder {
    font-family: inherit;
    color: #94a3b8;
  }
  .form-alert {
    color:  #842029;
    letter-spacing: 1px;
    text-transform: capitalize;
  }
  /* alert */

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .loading {
    width: 6rem;
    height: 6rem;
    border: 5px solid #94a3b8
    border-radius: 50%;
    border-top-color: #06b6d4;
    animation: spinner 0.6s linear infinite;
    margin: 0 auto;
  }

  /* title */

  .title {
    text-align: center;
  }

  .title-underline {
    background: #06b6d4;
    width: 7rem;
    height: 0.25rem;
    margin: 0 auto;
    margin-top: 1rem;
  }
  /* ============= PROJECT CSS =============== */

  .section-center {
    width: 90vw;
    margin: 0 auto;
    margin-top: 8rem;
    max-width: 30rem;
    background: #fff;
    border-radius: 0.25rem 1px 1px;
    padding: 2rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: 0.3s ease-in-out all;
  }
  .section-center:hover {
    box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.05);;
  }

  form h4 {
    color: #333;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .form-control {
    display: grid;
    grid-template-columns: 1fr 100px;
  }
  .form-input {
    border-radius: 0;
    border-top-left-radius: 0.25rem 1px 1px;
    border-bottom-left-radius: 0.25rem 1px 1px;
  }
  .form-control .btn {
    border-radius: 0;
    border-top-right-radius: 0.25rem 1px 1px;
    border-bottom-right-radius: 0.25rem 1px 1px;
  }

  .items {
    margin-top: 2rem;
    display: grid;
    row-gap: 1rem;
  }
  .single-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 1rem;
    align-items: center;
  }
  .single-item p {
    color: #444;
    letter-spacing: 1px;
  }

  .remove-btn {
    padding: 0.15rem 0.25rem;
    font-size: 0.75rem;
    background: #222;
  }

  .Toastify__toast {
    text-transform: capitalize;
  }
`;

export default Wrapper;

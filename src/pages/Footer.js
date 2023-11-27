import React from 'react'

const Footer = () => {
  return (
    <div>
       <footer className="footer-20192">
  <div className="site-section">
    <div className="container-fluid" >
       
      <div className="row footer-row">
        <div className="col-sm ">
          <a href="/"className="footer-logo" style={{fontWeight:"700"}}> GSP</a>
          <p className="copyright">
            <small>© 2022</small>
          </p>
        </div>
        {/* <div className="col-sm">
          <h3>Customers</h3>
          <ul className="list-unstyled links">
            <li><a href="/">Buyer</a></li>
            <li><a href="/">Supplier</a></li>
          </ul>
        </div> */}
        <div className="col-sm">
          <h3>Quick Links</h3>
          <ul className="list-unstyled links">
            <li><a href="/about">About us</a></li>
            {/* <li><a href="/contact">Careers</a></li> */}
            <li><a href="/contact">Contact us</a></li>
          </ul>
        </div>
        
        <div className="col-sm">
          <h3>Further Information</h3>
          <ul className="list-unstyled links">
            <li><a href="/term">Terms &amp; Conditions</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="col-sm">
          <h3>Login to continue</h3>
          <ul className="list-unstyled links mt-4">
            <li><a href="/login" className='login-button' style={{color:"#fff"}}>Login</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h3>Follow us</h3>
          <ul className="list-unstyled social">
            <li><a href="/"><span className="icon-facebook" /></a></li>
            <li><a href="/"><span className="icon-twitter" /></a></li>
            <li><a href="/"><span className="icon-linkedin" /></a></li>
          </ul>
        </div>

       
      </div>
      <div className="row">
      <div className="col-sm">
          <ul className="list-unstyled links mt-4">
            <li className='text-center mt-4'> GSP &copy; All Right Reserved</li> </ul>
        </div>
      </div>
    </div>
    
  </div>

</footer>
    </div>
  )
}

export default Footer

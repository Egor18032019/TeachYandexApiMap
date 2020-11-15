import React from "react";

function Footer() {

  return (
    <footer className="footer container">
      <div className="footer__copyright copyright">
        <a className="copyright__link copyright__link--image" href="https://github.com">
          <img src="#" width="130" height="45" alt="Гитхаб проекта" className="copyright__logo" />
        </a>
        <p>Сделано <a className="copyright__link copyright__link--text" href=""> мной</a> &copy; 2020</p>
      </div>
      <ul className="footer__contacts contacts">
        <li><a href="" className="contacts__link contacts__link--twitter">Twitter</a></li>
        <li><a href="" className="contacts__link contacts__link--instagram">Instagtam</a></li>
        <li><a href="" className="contacts__link contacts__link--facebook">Facebook</a>
        </li>
        <li><a href="" className="contacts__link contacts__link--vk">VK</a></li>
      </ul>
    </footer>
  );
}

export default Footer;



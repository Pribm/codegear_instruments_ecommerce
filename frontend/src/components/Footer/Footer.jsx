import React from 'react'

import styles from './Footer.module.scss'
import {RiFacebookFill, RiInstagramFill, RiTwitterFill, RiYoutubeFill} from 'react-icons/ri'

import PaymentIcon from "react-payment-icons-inline"

const Footer = () => {
  return (
    <div className={styles.footer+' d-flex justify-content-center'}>
      <div className="row container">
        <div className={"col-lg-6 "+styles.footer__socialMedia}>
          <div className={styles.footer__socialMedia_container+' d-flex flex-column align-items-center d-lg-block'}>
            <h4>Follow</h4>
            <div className={"d-flex mb-4 "+styles.footer__socialMedia_container_icons}>
              <RiFacebookFill/>
              <RiInstagramFill/>
              <RiTwitterFill/>
              <RiYoutubeFill/>
            </div>

          </div>
        </div>
        <div className={"col-lg-6 "+styles.footer__subscribe}>
            <ul className='d-flex justify-content-lg-start justify-content-center my-4 my-lg-0 mb-lg-4'>
              <li>NEW ARRIVALS</li>
              <li>DISCOUNTS</li>
              <li>CONTACT US</li>
            </ul>

            <div className={styles.footer__subscribe_inputs+' text-center text-lg-start'}>
              <h4 className='mb-4'>Subscribe to get the latest products!</h4>
              <input type="text" className='mb-4'/>
              <button>Subscribe</button>
              <p>Store developed by Paulo Monteiro - 2022</p>
            </div>


            <div className='d-flex flex-column align-items-center  align-items-lg-start'>
              <h4>Supported payments</h4>
              <div className="d-flex">
              {
                ['visa', 'mastercard', 'discover', 'amex'].map((card, index) => (
                  <PaymentIcon key={'card_flag_'+index} icon={card} style={{  width: 50 }} className={'me-4'}/>
                ))
              }
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
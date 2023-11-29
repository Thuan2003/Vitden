import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Footer extends Component {
    render() {
        return (
            <div className='align-bottom'>
                <div id='suport'>
                    <div id='detail1'>
                        TỔNG ĐÀI HỖ TRỢ (MIỄN PHÍ)
                    </div>
                    <div id='detail2'>
                        Gọi mua: 1800.1234 (8:00 - 21:00)<br />
                        CSKH:    1800.5678 (8:00 - 21:00)<br />
                        TTBH:    1800.6565 (8:00 - 21:00)
                    </div>
                </div>
                <div id='info'>
                    KẾT NỐI VỚI CHÚNG TÔI
                    <style>
                        border-top: 1px solid black;
                    </style>
                    <Link to='https://www.facebook.com/Lexomil1011'><img src='facebook.png'  alt="Logo"></img></Link>
                    <Link to='https://l.messenger.com/l.php?u=https%3A%2F%2Finstagram.com%2Flexomil.1011%3Figshid%3DM2RkZGJiMzhjOQ%253D%253D&h=AT3nJViayqQok4uncSWMgD1NzQ6ZJ7gHER5HCJdNpCYwunkFY9GI2SgvFLIFvHqQ8Ku0ipFB_8-C8rryGkVj7ONp2hN2vpJUXMsi_yoWjl_YF6fFZFr6KqMeVZ459UBYKcsznA'><img src='a.png' alt="Logo"></img></Link>
                    <Link to='https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.tiktok.com%2F%40amiylex%3F_t%3D8hiNO900YwD%26_r%3D1&h=AT0fJubu6zaZ4ScEz7ANl3mFVId-tRLmReAgj2trNzAO3_yrZhFL1n1DuhVylzhpqi_DUE_qCqcSNIx4fXPcJSCrkjtlgjlXisntmkDXz592qE8MVGYrXsMkEU18scsO_2lZ'><img src='tiktok.jpg' alt="Logo"></img></Link>
                    {/* <Link to='https://www.youtube.com/@Apple'><img src='youtube.jpg' alt="Logo"></img></Link> */}
                    {/* <Link to='https://twitter.com/Apple'><img src='tw.jpg' alt="Logo"></img></Link> */}
                </div>
            </div>
        )
    }
}

export default Footer
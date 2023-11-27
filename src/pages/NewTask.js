import React from 'react'
import { Link } from 'react-router-dom'

const NewTask = () => {
  return (
    <div className='task_img'>
    <h5 className='text-center text-info fw-bold m-3'>Hello, Nirala</h5>
    

{/* <!-- Hover #3 --> */}
<div class="box-3">
  <div class="taskbtn btn-three p-1">
    <h6 className='text-center  mt-2'>YOUR TODAY TASK IS PENDING</h6>
  </div>
</div>


<div className='taskDay'>
<div>
  <h6 className='fw-bold text-light'> PENDING</h6>
  <p className='fw-bold text-light mt-3' style={{marginBottom:'-10px'}}>Task 1</p>
</div>
<div>
  <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='60px' width='70px'></img>
</div>
</div>
<div className='taskDay'>
<div>
  <h6 className='fw-bold text-light'> PENDING</h6>
  <p className='fw-bold text-light mt-3' style={{marginBottom:'-10px'}}>Task 2</p>
</div>
<div>
  <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='60px' width='70px'></img>
</div>
</div>
<div className='taskDay'>
<div>
  <h6 className='fw-bold text-light'> PENDING</h6>
  <p className='fw-bold text-light mt-3' style={{marginBottom:'-10px'}}>Task 3</p>
</div>
<div>
  <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='60px' width='70px'></img>
</div>
</div>
<div className='taskDay'>
<div>
  <h6 className='fw-bold text-light'> PENDING</h6>
  <p className='fw-bold text-light mt-3' style={{marginBottom:'-10px'}}>Task 4</p>
</div>
<div>
  <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='60px' width='70px'></img>
</div>
</div>
<div className='taskDay'>
<div>
  <h6 className='fw-bold text-light'> PENDING</h6>
  <p className='fw-bold text-light mt-3' style={{marginBottom:'-10px'}}>Task 5</p>
</div>
<div>
  <img src='https://cdn-icons-png.flaticon.com/512/762/762686.png' height='60px' width='70px'></img>
</div>
</div>
<div className="bottom_section">

            <div className="row footer_row_content" style={{ backgroundImage: 'linear-gradient(to right,#CB218E 0%,  #6617CB 100%)', height: '70px' }}>
              <div className="col-12">
                <Link className='text-warning tex-center' style={{fontSize:'17px'}} to='/dashboard'> <b style={{ fontSize: '21px' }}>&copy;GSP</b> 2023 || All right reserved.</Link>
              </div>
            </div>
</div>
    </div>
  )
}

export default NewTask
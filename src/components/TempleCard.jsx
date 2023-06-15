import PropTypes from 'prop-types';

function TempleCard({data, openTempleDetail}){
    return(
        <>
  <div className="card text-center rounded-2 mb-3" id="cardList" data-bs-dismiss="offcanvas" onClick={()=>{openTempleDetail(data)}}>
  <img src="/logo_ipuc.png" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{data.name}</h5>
    {/* <a href="#" className="btn btn-primary stretched-link">Go somewhere</a> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
</>
    )
}
TempleCard.propTypes = {
  data: PropTypes.object.isRequired,
  openTempleDetail: PropTypes.func.isRequired,
};

export default TempleCard;
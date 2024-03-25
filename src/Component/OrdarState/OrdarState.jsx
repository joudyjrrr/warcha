function OrdarState(props) {
  const total = (props.accebted[0]?.count ?? 0) + (props.waiting[0]?.count ?? 0);

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "space-around", flexWrap: "wrap" }}>
      <div className='RelateCard'>
        <div>
          <p>Total Order</p>
          <h4>{total}</h4>
        </div>
        <img src="/total.png" alt="" />
      </div>
      <div className='RelateCard'>
        <div>
          <p>Accepted</p>
          <h4>{props.accebted[0]?.count ?? 0}</h4>
        </div>
        <img src="/accebt.png" alt="" />
      </div>
      <div className='RelateCard'>
        <div>
          <p>Waiting</p>
          <h4>{props.waiting[0]?.count ?? 0}</h4>
        </div>
        <img src="/whait.png" alt="" />
      </div>
      <div className='RelateCard'>
        <div>
          <p>Rejected</p>
          <h4>{props.rejected[0]?.count ?? 0}</h4>
        </div>
        <img src="/reject.png" alt="" />
      </div>
    </div>
  );
}

export default OrdarState;



function BLASKItem(props) {
    return (
        <div className="blask-item">
            <div className="abc">
                <div>
                    <div className="blask-checkbox">
                        <input id="cb" type="checkbox" aria-label="Select blask">
                        </input>
            </div>
                </div>
            </div>
            <div className="blask-image">
                <img 
                    src={props.image} 
                    alt=""
                />
            </div>
            <div className="blask-info">
                <div className="blask-header">
                    <h2>{props.title || "One of your quiz"}</h2>
                </div>
                
                <div className="blask-footer">
                    <img 
                        src={props.avatar} 
                        alt="" 
                        className="blask-avatar"
                    />
                    <h4 className="blask-author">{props.author || "You" }</h4>
                </div>
            </div>
        </div>
    )
}
export default BLASKItem;
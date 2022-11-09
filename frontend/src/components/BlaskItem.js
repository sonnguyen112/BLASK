

function BLASKItem(props) {
    return (
        <div width="1" className="blask-item">
            <div className="abc">
                <div>
                    <div className="blask-checkbox">
                        <input id="cb" type="checkbox" aria-label="Select blask">
                        </input>
            </div>
                </div>
            </div>
            <div className="blask-image">
                <img src={props.image}
                alt=""/>
            </div>
            <div width="1" className="blask-info">
                <div width="1" className="blask-header">
                    <div className="blask-title">{props.title || "One of your quiz"}</div>
                    <div className="blask-utils-btn">
                        <div>
                            <button className="btn"><i class="fa-solid fa-pencil"></i></button>
                        </div>
                        <div>
                            <button className="btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>
                    </div>
                </div>
                
                <div className="blask-footer">
                    <div className="blask-author">
                        <img 
                            src={props.avatar} 
                            alt="" 
                            className="blask-avatar"
                        />
                        {props.author || "You" }
                    </div>
                    <div className="blask-edit-info">
                        <div>
                            <button className="blask-start-btn" type="Start" value="Start">Start</button>
                        </div>
                        <div >
                            <button className="blask-assign-btn" type="Assign" value="Assign">Assign</button>
                        </div>
                        
                        <span>{props.edit_time || ""}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BLASKItem;
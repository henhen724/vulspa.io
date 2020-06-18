export default function navitem(fnc, name) {
    return (<div className="col">
        <div className="container bg-light text-dark pl-1 pr-2" style={{ fontSize: '50%' }}>{fnc}</div>
        <div className="container bg-dark text-light border pt-1 pb-1 pl-1 pr-2" style={{ fontSize: '100%' }}>
            {name}
        </div>
    </div >)
}
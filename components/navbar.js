import navitem from './navitem';

export default function navbar() {
    return (
        <div className="container-fluid mt-2 w-100">
            <div className="row">
                {navitem('F1', 'USER')}
                {navitem('F2', 'ADMIN')}
                {navitem('F3', 'SYSTEM')}
                {navitem('F4', 'LOGS')}
                {navitem('F5', 'MEMORY')}
                {navitem('F6', 'POWER')}
                {navitem('F7', 'NETWORK')}
                {navitem('F8', 'SECURITY')}
            </div>
        </div>)
}
import * as React from 'react'

class DumbTextarea extends React.Component {

    handleChange(event) {
        
    }

    render() {
        const content = this.props.content;
        
        return (
            <div className={this.props.className + " relative"}>
                <label htmlFor={this.props.id} className="block text-sm font-medium text-gray-900">{this.props.label}</label>
                <p className="block text-xs text-blue-700 mb-2">{this.props.children}</p>
                <textarea value={content} onChange={this.handleChange} id={this.props.id} rows={this.props.rows} className="block p-2.5 w-full text-xxs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Generated"/>
                <div className="w-4 h-4 fill-slate-300 absolute right-0 top-5 hover:fill-blue-500 active:fill-red-500" role="button" tabIndex="0" onClick={() => {navigator.clipboard.writeText(content)}} onKeyDown={() => {navigator.clipboard.writeText(content)}}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/></svg>
                </div>
            </div>
        );
    }
}

export default DumbTextarea
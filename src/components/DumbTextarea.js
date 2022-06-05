import * as React from 'react'

class DumbTextarea extends React.Component {

    handleChange(event) {
        
    }

    render() {
        const content = this.props.content;
        
        return (
            <div className={this.props.className }>
                <label htmlFor="SvgSourceTextarea" className="block mb-2 text-sm font-medium text-gray-900">{this.props.label}</label>
                <textarea value={content} onChange={this.handleChange} id="SvgSourceTextarea" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Generated"/>
            </div>
        );
    }
}

export default DumbTextarea
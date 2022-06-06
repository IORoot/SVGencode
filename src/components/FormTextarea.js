import * as React from 'react'

class FormTextarea extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onSvgChange(event.target.value);
    }

    render() {
        const svgRawCode = this.props.svgRawCode;

        return (
            <div className={this.props.className }>
                <label htmlFor="SvgSourceTextarea" className="block mb-2 text-sm font-medium text-gray-900">{this.props.label}</label>
                <textarea value={svgRawCode} onChange={this.handleChange} id="SvgSourceTextarea" rows={this.props.rows}  className="block p-2.5 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paste your SVG code here..."/>
            </div>
        );
    }
}

export default FormTextarea
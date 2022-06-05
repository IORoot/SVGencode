import * as React from 'react'

class FormTextarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <label htmlFor="SvgSourceTextarea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">SVG Image</label>
                <textarea value={this.state.value} onChange={this.handleChange} id="SvgSourceTextarea" rows="4"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paste your SVG code here..."/>
            </div>
        );
    }
}

export default FormTextarea
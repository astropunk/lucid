import _ from 'lodash';
import React from 'react';
import Validation from '../Validation/Validation';
import TextField from '../TextField/TextField';
import reducers from '../TextField/TextField.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes } from '../../util/component-types';

const cx = lucidClassNames.bind('&-TextFieldValidated');

const {
	any,
	object,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "text"], "extend": "TextField", "madeFrom": ["TextField", "Validation"]}
 *
 * A composition of TextField and Validation.
 */
const TextFieldValidated = createClass({
	displayName: 'TextFieldValidated',

	reducers,

	components: {
		Error: createClass({
			displayName: 'TextFieldValidated.Error',
			propName: 'Error',
		}),
	},

	propTypes: {
		...TextField.propTypes,

		/**
		 * Passed to the root container.
		 */
		style: object,

		/**
		 * Passed to the root container.
		 */
		className: string,

		/**
		 * Prop alternative to Error child component
		 */
		Error: any,
	},

	getDefaultProps() {
		return TextField.getDefaultProps();
	},

	render() {
		const {
			className,
			style,
		} = this.props;

		const errorChildProps = _.map(findTypes(this.props, TextFieldValidated.Error), 'props');

		return (
			<Validation
				className={cx('&', className)}
				style={style}
				Error={errorChildProps}
			>
				<TextField {..._.omit(this.props, ['Error', 'style', 'className'])} />
			</Validation>
		);
	},
});

export default TextFieldValidated;

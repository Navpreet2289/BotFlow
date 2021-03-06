
import React from 'react';
import ListFilter from '../../components/ListFilter';
import UtterIcon from '../../icons/UtterIcon';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {

    const tree = renderer
        .create(<ListFilter
            icon={< UtterIcon />}
            items={[{name: '1'}, {name: '2'}]}
            text='example text'
            actionOnClick={jest.fn()}
            selected_item_position={0}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
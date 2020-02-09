import React, { Component } from 'react';
import TablatureDisplay from '../TablatureDisplay/TablatureDisplay';
import TablatureSearch from '../TablatureSearch/TablatureSearch';


class ControlPanel extends Component {
    render() {
        return (
            <div>
                <TablatureSearch />
                <TablatureDisplay />
            </div>
        )
    }
}

export default ControlPanel;
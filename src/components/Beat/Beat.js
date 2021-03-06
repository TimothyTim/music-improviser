import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Music from '../../utils/Music.js';
import Player from '../Player/Player.js';

class Beat extends React.Component {
    constructor(props) {
        super(props);

        this.player = null;
        this.sameBeat = false;

        const instruments = ['hihatOpen', 'hihat', 'snap', 'kick'];
        const subBeats = 16;

        this.state = {
            instruments: instruments,
            subBeats: subBeats
        };

        this.items = this.initItemState(instruments, subBeats);
        this.nextBar = this.nextBar.bind(this);
        this.drawRow = this.drawRow.bind(this);
        this.drawItem = this.drawItem.bind(this);
        this.getItemState = this.getItemState.bind(this);
        this.initItemState = this.initItemState.bind(this);
        this.playInstrument = this.playInstrument.bind(this);
    }

    componentDidMount() {
        let _this = this;

        this.player = new Player();
        this.player.loadMulti([
            '/public/audio/kick.wav',
            '/public/audio/snap.wav',
            '/public/audio/hihat.wav',
            '/public/audio/hihatOpen.wav'
        ], function(bufferList) {
            _this.kick = bufferList[0];
            _this.snap = bufferList[1];
            _this.hihat = bufferList[2];
            _this.hihatOpen = bufferList[3];
        });
    }

    componentDidUpdate(prevProps) {
        if (_.isEqual(prevProps.clock.nextTick, this.props.clock.nextTick)) {
            this.sameBeat = true;
            return ;
        }

        this.sameBeat = false;

        if (prevProps.clock.nextTick.beatIndex !== this.props.clock.nextTick.beatIndex) {
            this.nextBar();
        }
    }

    nextBar() {
        if (this.props.rhythm.isCountIn) {
            this.player.play(this.snap);
        }
    }

    playInstrument(instrumentIndex) {
        const instrument = this.state.instruments[instrumentIndex];
        this.player.play(this[instrument]);
    }

    initItemState(instruments, subBeats) {
        let itemsState = [];

        for (let i = 0; i < instruments.length; i++) {
            itemsState[i] = [];

            for (let x = 0; x < subBeats; x++) {
                itemsState[i][x] = 'inactive';
            }
        }

        return itemsState;
    }

    getItemState(rowIndex, index) {
        return this.items[rowIndex][index];
    }

    setItemState(rowIndex, index) {
        let items = _.clone(this.items);
        const itemState = items[rowIndex][index];

        if (itemState === 'active') {
            items[rowIndex][index] = 'inactive';
        } else {
            items[rowIndex][index] = 'active';
        }

        this.setState({items: items});
    }

    drawRow(row, rowIndex) {
        return (
            <div key={rowIndex} className="beat__row">
                <div className="beat__row__label">{this.state.instruments[rowIndex]}</div>
                <div className="beat__row__list">
                    {row.map((itemState, index) => {
                        return this.drawItem(itemState, index, rowIndex);
                    })}
                </div>
            </div>
        );
    }

    drawItem(itemState, index, rowIndex) {
        const id = rowIndex + "-" + index;
        const nextTick = _.get(this.props, 'clock.nextTick');
        let isCurrent = '';

        if (nextTick) {
            isCurrent = Music.convertBeatPosToLinearVal(nextTick) === index ? 'is-current' : '';
        }

        if (isCurrent && itemState === 'active' && !this.sameBeat) {
            this.playInstrument(rowIndex);
        }

        return (
            <div key={id}
                className={`beat__row__list__item no-select ${id} ${isCurrent} is-${itemState}`}
                onClick={this.setItemState.bind(this, rowIndex, index)}>
            </div>
        );
    }

    render() {
        return (
            <div id="beat-container" className="beat">
                <h2>Beat Maker</h2>
                {this.items.map(this.drawRow)}
            </div>
        );
    }
}

Beat.propTypes = {
    clock: PropTypes.object.isRequired,
    rhythm: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        clock: state.clock,
        rhythm: state.rhythm
    };
}

export default connect(mapStateToProps)(Beat);

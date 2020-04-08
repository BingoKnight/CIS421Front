import React, {useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';
import './App.css';

const ListBody = (props) => {
    if (props.dbList.length > 0 && !props.isLoading)
        return props.dbList.map(record => (
            <tr>
                <td>{record['hash_id']}</td>
                <td>{record['joined_field']}</td>
                <td>{record['field1']}</td>
                <td>{record['field2']}</td>
                <td>{record['field3']}</td>
                <td>{record['field4']}</td>
                <td>{record['field5']}</td>
                <td>{record['field6']}</td>
            </tr>
        ));

    else if (props.isLoading)
        return (
            <tr>
                <td colSpan={7} className={'text-center'}>Loading...</td>
            </tr>
        );
    else
        return (
            <tr>
                <td colSpan={7} className={'text-center'}>No records in database</td>
            </tr>
        )
};

const JoinedList = (props) => (
    <div className={'row'} id={'joined-list'}>
        <h3 className={'title'}>Database</h3>
        <table className={'table'}>
            <thead>
                <th scope={'col'}>Hash ID</th>
                <th scope={'col'}>Joined Field</th>
                <th scope={'col'}>Field 1</th>
                <th scope={'col'}>Field 2</th>
                <th scope={'col'}>Field 3</th>
                <th scope={'col'}>Field 4</th>
                <th scope={'col'}>Field 5</th>
                <th scope={'col'}>Field 6</th>
            </thead>
            <tbody>
            <ListBody dbList={props.dbList} isLoading={props.isLoading}/>
            </tbody>
        </table>
    </div>
);

const R1Row = (props) => (
    <div className={'d-flex r-section'} id={'r1-row-' + props.id}>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r1-input0'}/></div>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r1-input1'}/></div>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r1-input2'}/></div>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r1-input3'}/></div>
    </div>
);

const R2Row = (props) => (
    <div className={'d-flex r-section'} id={'r2-row-' + props.id}>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r2-input0'}/></div>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r2-input1'}/></div>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r2-input2'}/></div>
        <div className={'col'}><input type={'text'} className={'form-control num-input'} id={'r2-input3'}/></div>
    </div>
);

const RelationalDataForm = (props) => {
    const r1Rows = [];
    const r2Rows = [];

    for (let i = 0; i < props.rowCount; i++) {
        r1Rows.push(<R1Row key={i} id={i}/>);
        r2Rows.push(<R2Row key={i} id={i}/>);
    }

    const addRow = () => {
        if (props.rowCount < 10)
            props.setRowCount(props.rowCount + 1);
    };

    const deleteRow = () => {
        if (props.rowCount > 1)
            props.setRowCount(props.rowCount - 1);
    };

    return (
        <div className={'row'}>
            <div className="col col-md-11">
                <div className="row">
                    <div className="col border-right r-container">
                        <h4 className={'title'}>R1</h4>
                        {r1Rows}
                        <div className={'d-flex'}>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r1-radio1' name="r1-radio-group" value={0} defaultChecked/>
                                <label className="custom-control-label" htmlFor="r1-radio1" />
                            </div>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r1-radio2' name="r1-radio-group" value={1} />
                                <label className="custom-control-label" htmlFor="r1-radio2" />
                            </div>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r1-radio3' name="r1-radio-group" value={2} />
                                <label className="custom-control-label" htmlFor="r1-radio3" />
                            </div>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r1-radio4' name="r1-radio-group" value={3} />
                                <label className="custom-control-label" htmlFor="r1-radio4" />
                            </div>
                        </div>
                    </div>
                    <div className="col border-left r-container">
                        <h4 className={'title'}>R2</h4>
                        {r2Rows}
                        <div className={'d-flex'}>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r2-radio1' name="r2-radio-group" value={0} defaultChecked/>
                                <label className="custom-control-label" htmlFor="r2-radio1" />
                            </div>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r2-radio2' name="r2-radio-group" value={1} />
                                <label className="custom-control-label" htmlFor="r2-radio2" />
                            </div>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r2-radio3' name="r2-radio-group" value={2} />
                                <label className="custom-control-label" htmlFor="r2-radio3" />
                            </div>
                            <div className={'col custom-control custom-radio custom-control-inline'}>
                                <input type="radio" className="custom-control-input" id='r2-radio4' name="r2-radio-group" value={3}/>
                                <label className="custom-control-label" htmlFor="r2-radio4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col align-self-end r-container">
                <div className={'row'}>
                    {props.rowCount > 1 ? <button className={'btn btn-outline-danger'} id={'delete-row-btn'}
                                            onClick={deleteRow}>X</button> : null}
                    {props.rowCount < 10 ? <button className={'btn btn-outline-primary'} onClick={addRow}>+</button> : null}
                </div>
                <div className="row">&nbsp;</div>
            </div>
        </div>
    )
};

const submitRelations = (rowCount, setDbList) => {

    let r1Array = [];
    let r2Array = [];

    for(let i = 0; i < rowCount; i++){
        let tempR1Arr = [];
        let tempR2Arr = [];

        for(let j = 0; j < 4; j++){
            console.log($('#r1-row-' + i + ' #r1-input' + j).val())
            tempR1Arr.push($('#r1-row-' + i + ' #r1-input' + j).val());
            tempR2Arr.push($('#r2-row-' + i + ' #r2-input' + j).val());
        }

        r1Array.push(tempR1Arr);
        r2Array.push(tempR2Arr);
    }

    const request = {
        r1: [...r1Array],
        r2: [...r2Array],
        join_index_r1: $("input[name='r1-radio-group']:checked").val(),
        join_index_r2: $("input[name='r2-radio-group']:checked").val()
    };

    console.log(request)
    axios.post('http://localhost:8000/api/', request)
        .then(res => {
            setDbList(res.data)
            $('#error-alert').removeClass('alert-danger');
            $('#error-alert').addClass('alert-success');
            $('#error-alert').text('Record(s) successfully added to database');
            $('#error-alert').css('visibility', 'visible');
            setTimeout(() => {
                $('#error-alert').css('visibility', 'hidden');
            }, 10000);
        }).catch(err => {
            console.log(err.response.data['details']);
            $('#error-alert').text(err.response.data.details);
            $('#error-alert').addClass('alert-danger');
            $('#error-alert').removeClass('alert-success');
            $('#error-alert').css('visibility', 'visible');
            setTimeout(() => {
                $('#error-alert').css('visibility', 'hidden');
            }, 10000);
        }
    )
};

const clearDatabase = (setDbList) => {
    axios.delete('http://localhost:8000/api/')
        .then(res => {
            if(res.status=200) {
                setDbList({})
                $('#error-alert').removeClass('alert-danger');
                $('#error-alert').addClass('alert-success');
                $('#error-alert').text('Database successfully deleted');
                $('#error-alert').css('visibility', 'visible');
                setTimeout(() => {
                    $('#error-alert').css('visibility', 'hidden');
                }, 10000);
            }
        })
};

const IntroModal = () => (
    <div className="modal fade" id="intro-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modal-title">Welcome!</h5>
                </div>
                <div className="modal-body">
                    <p>
                        Here you can join up to ten tuples of 4 fields each into a hash table. The backend will accept
                        the inputted fields in R1 and R2, and join them together by the index selected. The fields are
                        then placed into a hash table based on the modulus of the value selected to join the two tuples
                        together (f(x) = selected index MOD 10). The max size of this hash table is only 10, once the max
                        size has been reached you must clear the database.
                    </p>
                    <p>
                        To join two tuples together you must input numbers in the fields underneath R1 and R2. Then you must
                        select the radio button underneath the values which the tuples should be joined on (values much match
                        eachother). Once the values have been inputted and the indicies to join on have been selected you
                        may submit the query and if it was successful you will see it added to the database below.
                    </p>
                    <p>
                        You may join multiple tuples at the same time by using the add button on the right-hand side. You
                        may also clear the database at any moment by clicking the clear button.
                    </p>
                </div>
                <div className="modal-footer align-self-center">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                </div>
            </div>
        </div>
    </div>
)



const App = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [rowCount, setRowCount] = useState(1);
    const [dbList, setDbList] = useState([]);

    if (isLoading) {
        axios.get('http://localhost:8000/api/')
            .then(res => {
                setDbList(res.data);
            }).then(() => setIsLoading(false));
    }

    useEffect(() => {
        window.$('#intro-modal').modal('show');
    });

    return (
        <div className="App">
            <IntroModal />
            <div className="container">
                <div className={'alert alert-danger'} id={'error-alert'}>Error Alert</div>
                <h2 className={'title'}>Joining Relational Databases</h2>
                <hr/>
                <RelationalDataForm rowCount={rowCount} setRowCount={setRowCount} />
                <div className="row">
                    <div id={'buttons-bar'}>
                        <button className={'btn btn-danger'} onClick={()=>clearDatabase(setDbList)}>Clear Database</button>
                        <button className={'btn btn-primary'} onClick={()=>submitRelations(rowCount, setDbList)}>Submit</button>
                    </div>
                </div>
                <JoinedList dbList={dbList}/>
            </div>
        </div>
    );
};

export default App;

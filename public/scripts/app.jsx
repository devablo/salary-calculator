let Form = mui.react.Form,
    Button = mui.react.Button,
    Input = mui.react.Input,
    Appbar = mui.react.Appbar,
    Panel = mui.react.Panel,
    Checkbox = mui.react.Checkbox,
    Row = mui.react.Row,
    Col = mui.react.Col,
    Container = mui.react.Container;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.label = props.label;
    }
    render() {
        return (
            <div>
                <Appbar>
                    <Container>
                    <table>
                        <tbody><tr class="mui--appbar-height">
                            <td class="mui--text-title">Salary Calculator</td>
                        </tr>
                        </tbody>
                    </table>
                    </Container>               
                </Appbar>
                <Container>
                    <CalculatorForm />
                </Container>
            </div>
        );
    }
}

// Pure Functional Component
function Header(props) {
    return <h1>{props.name}</h1>;
}
function Label({label, value}) {
    
    return (
        <div>
            <span className="mui--text-dark">{label}</span>
            <span className="mui--text-dark-secondary">{value}</span>
        </div>
    )
}
// Example of using ES6 & Props
class CalculatorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            salary: null, 
            baseSalary: 0,
            superAnnuation: 0, 
            incomeTax: 0,
            package: 0,
            includesSuper: false,
            hasPrivateHealthcare: false 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let baseSalary = getBaseSalary(event.target.value, this.state.includesSuper);
        this.setState({
            salary: event.target.value,
            baseSalary: baseSalary,
            superAnnuation: calculateSuper(event.target.value, this.state.includesSuper),
            incomeTax: personalIncomeTax(baseSalary),
            package: calculatePackage(event.target.value, this.state.includesSuper)
        });
    }
    handleCheckBoxChange(event) {
        console.info(event.target.name);
        let baseSalary = this.state.baseSalary;
        let superAnnuation = this.state.superAnnuation;

        if (event.target.name === "includesSuper") {
            baseSalary = getBaseSalary(this.state.salary, event.target.checked);
            superAnnuation = calculateSuper(this.state.salary, event.target.checked);

            this.setState({
                [event.target.name]: event.target.checked,
                baseSalary: baseSalary,
                superAnnuation: superAnnuation,
                incomeTax: personalIncomeTax(baseSalary),
                package: calculatePackage(this.state.salary, event.target.checked)
            });
        }

        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Header name="Income"></Header>
                    <Input label="Salary" required={true} type="text" value={this.state.salary} onChange={this.handleChange} required={true} placeholder="$" />
                    <Checkbox
                        name="includesSuper"
                        defaultChecked={false}
                        label="Includes Super"
                        checked={this.state.includesSuper}
                        onChange={this.handleCheckBoxChange}
                    />
                    <Checkbox
                        name="hasPrivateHealthcare"
                        defaultChecked={false}
                        label="Private Healthcare"
                        checked={this.state.hasPrivateHealthcare}
                        onChange={this.handleCheckBoxChange}
                    />
                    {/* <Button color="primary">Calculate</Button> */}
                    
                    <Header name="Pay (Estimate)"></Header>
                    <Row>
                    <Col xs="12" md="6">
                        <Panel>
                            <Label label="Base Salary: " value={formatToCurrency(this.state.baseSalary)} />
                            <Label label="Super: " value={formatToCurrency(this.state.superAnnuation)} />
                            <Label label="Package: " value={formatToCurrency(this.state.package)} />
                            <Label label="Take Home: " value={formatToCurrency(calculateTakeHome(this.state.baseSalary, this.state.hasPrivateHealthcare))} />
                            <Label label="Income Tax: " value={formatToCurrency(this.state.incomeTax)} />
                            <Label label="Medicare: " value={formatToCurrency(calculateMedicare(this.state.baseSalary))} />
                            <Label label="Medicare Surcharge Levy: " value={formatToCurrency(medicareSurcharge(this.state.baseSalary, this.state.hasPrivateHealthcare))} />
                        </Panel>
                    </Col>
                    <Col xs="12" md="6">
                        <Panel>
                            <Label label="Per Month: " value={formatToCurrency(monthly(this.state.baseSalary))} />
                            <Label label="Per Day (Based on Working Days / Public Holdays): " value={formatToCurrency(daily(this.state.baseSalary))} />
                        </Panel>
                    </Col>
                </Row>
                </Container>
            </Form>
        );
    }
}

function increaseByPercentage(num, percentage){
    let value = num || 0;
    let percentageValue = percentage || 0;
    return (value/100) * percentageValue;
}
function originalFromPercentageIncrease(num, percentage){
    let value = num || 0;
    let percentageValue = percentage || 0;
    return value/(100+percentageValue) * 100;
}
function calculateSuper(salary, includesSuper){
    let value = salary || 0;
    if (includesSuper) {
        // we need to get 9.5% of 100% including super
        let originalBase = originalFromPercentageIncrease(value, 9.5);
        let superannuation = salary - originalBase;
        return superannuation.toFixed(2);
    }
    
    let percentage = increaseByPercentage(value, 9.5);
    return percentage.toFixed(2);
}
function getBaseSalary(salary, includesSuper){
    let value = parseFloat(salary) || 0;
    let superannuation = calculateSuper(value, includesSuper);
    let baseSalary = includesSuper ? (value - superannuation) : value;
    return baseSalary.toFixed(2);
}
function calculateMedicare(value){
    value = value || 0;
    let decimalVal = increaseByPercentage(value, 2);
    return decimalVal.toFixed(2);
}
function calculatePackage(salary, includesSuper){
    let value = parseFloat(salary) || 0;
    if (includesSuper) {
        return value;
    }

    let superannuation = parseFloat(calculateSuper(value, includesSuper));
    let calculated = value + superannuation;
    return calculated.toFixed(2);
}
function calculateTakeHome(baseSalary, hasPrivateHealthcare){
    let salaryTaxable = parseFloat(baseSalary);
    let medicare = parseFloat(calculateMedicare(baseSalary));
    let personalIncome = personalIncomeTax(salaryTaxable);
    let mls = medicareSurcharge(baseSalary, hasPrivateHealthcare);
    let calculated = salaryTaxable - medicare - personalIncome;
    return calculated.toFixed(2);
}
function personalIncomeTax(salary){
    const threshold = [{
            from: 0,
            to: 18200, 
            rate: 0
        },{
            from: 18201,
            to: 37000, 
            rate: 19
        },{
            from: 37001,
            to: 90000, 
            rate: 32.5
        },{
            from: 90001,
            to: 180000, 
            rate: 37
        },{
            from: 180001,
            to: 99999999, 
            rate: 45
        },
    ];

    let val = parseInt(salary) || 0;
    let calculated = 0;

    var matches = threshold.filter(item =>
        val >= item.from);

    matches.forEach(item => {
        let amount = Math.min(val, item.to) - (item.from - 1);
        calculated += increaseByPercentage(amount, item.rate);
    });

    return calculated;

    // let val = value || 0;
    // let calculated = 0;
    // No tax paid for less than $18201
    // if (val <= 18200){
    //     calculated = 0;
    // }
    // // Tax Bracket A
    // if (val > 18200) {
    //     let amountToTax = Math.min(val, 37000) - 18200;
    //     calculated += increaseByPercentage(amountToTax, 19);
    // }
    // // Tax Bracket B
    // if (val > 37000) {
    //     // get the base amount to apply calc & the max is in the 180k bracket
    //     let amountToTax = Math.min(val, 90000) - 37000;
    //     calculated += increaseByPercentage(amountToTax, 32.5);
    // }
    // // Tax Bracket C
    // if (val > 90000 && val <= 180000) {
    //     // get the base amount to apply calc & the max is in the 180k bracket
    //     let amountToTax = Math.min(val, 180000) - 90000;
    //     calculated += increaseByPercentage(amountToTax, 37);
    // }
    // // Tax Bracket D
    // if (val > 180000) {
    //     // we know the last tax bracket and all above 180k needs tax applied
    //     let amountToTax = val - 180000;
    //     calculated += increaseByPercentage(amountToTax, 45);
    // }

    // return calculated;
}
function medicareSurcharge(salary, hasPrivateHealthcare){
    if (hasPrivateHealthcare)
        return 0;

    const threshold = [{
            from: 0,
            to: 90000, 
            rate: 0
        },{
            from: 90001,
            to: 105000, 
            rate: 1
        },{
            from: 105001,
            to: 140000, 
            rate: 1.25
        },{
            from: 140000,
            to: 99999999, 
            rate: 1.5
        },
    ];

    let val = parseInt(salary) || 0;
    let calculated = 0;

    var match = threshold.filter(item =>
        val >= item.from && 
        val <= item.to)[0];

    if (match) {
        calculated = increaseByPercentage(val, match.rate);
    }
    
    return calculated;
}
function monthly(value){
    let takeHome = parseFloat(calculateTakeHome(value));
    let calculated = takeHome/12;
    return calculated.toFixed(2);
}
function weekly(value){
    let takeHome = parseFloat(calculateTakeHome(value));
    let calculated = takeHome/52;
    return calculated.toFixed(2);
}
function daily(value){
    let takeHome = parseFloat(calculateTakeHome(value));
    let workingDays = 5*52;
    let holidays = 13;
    let totalDays = workingDays - holidays;
    let calculated = takeHome/totalDays;
    return calculated.toFixed(2);
}
function formatToCurrency(value){
    const formatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 2
      });

    let val = 0;
    val = value || val;
    return formatter.format(val);
}

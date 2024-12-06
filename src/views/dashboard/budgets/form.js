import ResourceForm from '../components/ResourceForm'
import * as formSchema from './form-schema'

export default function BudgetForm() {


    return (
        <div>
            <ResourceForm
                resource={'budgets'}
                title={'Budget Data Form'}
                subtitle={'Fill out necessary input for the report'}
                form={formSchema}
            />
        </div>

    )
}

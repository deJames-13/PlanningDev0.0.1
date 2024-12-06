import ResourceForm from '../components/ResourceForm'
import * as formSchema from './form-schema'

export default function ParticularForm() {


    return (
        <div>
            <ResourceForm
                resource={'particular'}
                title={'Particular Information Form'}
                subtitle={'Fill out necessary input for the report'}
                form={formSchema}
            />

        </div>

    )
}

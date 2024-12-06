import ResourceForm from '../components/ResourceForm'
import * as formSchema from './form-schema'

export default function SectorForm() {

    return (
        <div>
            <ResourceForm
                resource={'sectors'}
                title={'Sectoral Offices Form'}
                subtitle={'Fill out necessary input for the report'}
                form={formSchema}
            />
        </div>
    )
}

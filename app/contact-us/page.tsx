
import React from 'react'
import { ContactHeroSection } from '../components/contact/ContactHeroSection'
import contact from '@/app/data/contact.json';
import ContactSection, { type ContactContent } from '../components/contact/ContactFormSection';


function ContactUs() {
    return (
        <div>
            <ContactHeroSection
                title={contact?.hero?.title ?? ""}
                description={contact?.hero?.description ?? ""}
                mainImag={contact?.hero?.image ?? {}}
                button={contact?.hero?.button ?? {}}
            />


            <div>
                <ContactSection content={contact.formSection as ContactContent} />
            </div>
        </div>
    )
}

export default ContactUs

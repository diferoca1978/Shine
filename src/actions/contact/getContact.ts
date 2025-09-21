import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const getContact = defineAction({
  accept: 'form',
  input: z.object({
    fullName: z.string().min(3, 'El nombre debe contener minimo 3 letras').max(30, 'El nombre es demasiado largo'),
    email: z.string().email('Debe ser un correo valido'),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
    inquietudes: z.string().min(10, 'El mensaje debe contener minimo 10 letras.' ).max(500, 'El mensaje es demasiado largo.'),
    terms: z.union([z.literal('true'), z.null()]).refine(val => val === 'true', { 
      message: 'Debes aceptar los términos y condiciones' 
    })
  }),
  handler: async ({fullName, email, telefono, inquietudes}) => {
    try {
       const { data, error } = await resend.emails.send({
        from: 'Shine <noreply@shineagencia.com>',
        to: ['rocio.shineagencia@gmail.com'],
        subject: 'Nuevo contacto desde la web',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Montserrat', Arial, sans-serif; background-color: #F7F5F3;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FEFEFE; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(77, 77, 77, 0.1);">
            
            <!-- Header -->
            <div style="background: #a5b89f; padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FEFEFE; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                ✨ Shine
              </h1>
              <p style="margin: 8px 0 0 0; color: #FEFEFE; font-size: 16px; opacity: 0.9;">
                Nuevo mensaje de contacto
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px;">
              <div style="background-color: #F2F2F2; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; color: #000; font-size: 18px; font-weight: 600;">
                  📩 Detalles del contacto
                </h2>
                
                <div style="margin-bottom: 16px;">
                  <div style="display: inline-block; background-color: #a5b89f; color: #FEFEFE; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                    NOMBRE
                  </div>
                  <p style="margin: 0; color: #000; font-size: 16px; font-weight: 500;">
                    ${fullName}
                  </p>
                </div>

                <div style="margin-bottom: 16px;">
                  <div style="display: inline-block; background-color: #a5b89f; color: #FEFEFE; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                    EMAIL
                  </div>
                  <p style="margin: 0; color: #000; font-size: 16px;">
                    <a href="mailto:${email}" style="color: #000; text-decoration: none;">${email}</a>
                  </p>
                </div>

                <div style="margin-bottom: 16px;">
                  <div style="display: inline-block; background-color: #a5b89f; color: #FEFEFE; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                    TELÉFONO
                  </div>
                  <p style="margin: 0; color: #000; font-size: 16px;">
                    <a href="tel:${telefono}" style="color: #000; text-decoration: none;">${telefono}</a>
                  </p>
                </div>

                <div>
                  <div style="display: inline-block; background-color: #a5b89f; color: #FEFEFE; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 8px;">
                    MENSAJE
                  </div>
                  <div style="background-color: #FEFEFE; border: 2px solid #E6C975; border-radius: 6px; padding: 16px;">
                    <p style="margin: 0; color: #000; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                      ${inquietudes}
                    </p>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="mailto:${email}" style="display: inline-block; background: #a5b89f; color: #FEFEFE; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(197, 168, 216, 0.3);">
                  Responder al cliente
                </a>
              </div>

              <!-- Footer info -->
              <div style="border-top: 2px solid #E6C975; padding-top: 16px; text-align: center;">
                <p style="margin: 0; color: #5F7A7A; font-size: 13px;">
                  Este mensaje fue enviado desde el formulario de contacto de <strong>shineagencia.com</strong>
                </p>
                <p style="margin: 8px 0 0 0; color: rgba(95, 122, 122, 0.7); font-size: 12px;">
                  ${new Date().toLocaleDateString('es-CO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>`
      });

      if (error) {
        console.error('Resend error:', error);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message
        });
      }
      
      
      return { ok: true, data }
      
    } catch (err) {
      console.error('Handler error:', err);
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: err instanceof Error ? err.message : 'Unknown error occurred'
      });
    }
  }
})
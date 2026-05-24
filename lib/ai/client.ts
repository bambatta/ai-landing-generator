import { Agent, Runner } from '@openai/agents'

export { Agent }

/**
 * Shared runner with tracing disabled.
 * Created once at module load; the API key is read by the SDK at call time.
 */
export const runner = new Runner({ tracingDisabled: true })

/**
 * Validates the OpenAI API key is set at runtime (not at build time).
 * Called at the start of each API route handler.
 */
export function ensureApiKey(): void {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }
}

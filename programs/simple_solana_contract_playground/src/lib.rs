use anchor_lang::prelude::*;

declare_id!("EYKoYivGj6wMVhemQmoiM8GyPqDebXmWjp7ybDPwXji8");

#[program]
pub mod simple_solana_contract_playground {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

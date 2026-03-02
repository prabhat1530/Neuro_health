import {
    Activity, LayoutDashboard, Users, Video, Wallet, Settings, LogOut,
    Bell, ChevronDown, Clock, IndianRupee, Star, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ProviderPage() {
    return (
        <div className="dashboard-body">
            <aside className="sidebar glass-panel">
                <div className="sidebar-brand logo-group">
                    <Activity className="logo-icon" />
                    <span className="logo-text">Nuero Health Pro</span>
                </div>

                <nav className="sidebar-nav">
                    <Link href="#" className="nav-item active"><LayoutDashboard /> Today's Schedule</Link>
                    <Link href="#" className="nav-item"><Users /> My Patients</Link>
                    <Link href="#" className="nav-item"><Video /> Teleconsults</Link>
                    <Link href="#" className="nav-item"><Wallet /> Earnings</Link>
                    <Link href="#" className="nav-item mt-auto"><Settings /> Profile Settings</Link>
                    <Link href="/" className="nav-item"><LogOut /> Logout</Link>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1 className="welcome-text">Dr. Sharma's Portal 👨‍⚕️</h1>
                        <p className="text-secondary">Manage your appointments and availability.</p>
                    </div>
                    <div className="header-actions">
                        <div className="flex-between glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '30px', gap: '0.5rem' }}>
                            <div style={{ width: 10, height: 10, background: 'var(--secondary)', borderRadius: '50%', boxShadow: '0 0 10px var(--secondary)' }}></div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Taking Patients</span>
                            <ChevronDown className="icon-sm" />
                        </div>
                        <button className="btn btn-outline icon-btn"><Bell /></button>
                        <div className="user-profile">
                            <div className="avatar sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Dr.S</div>
                        </div>
                    </div>
                </header>

                <section className="metrics-grid">
                    <div className="metric-card glass-panel">
                        <div className="metric-icon bg-primary-soft"><Users /></div>
                        <div className="metric-info">
                            <p className="metric-label">Today's Patients</p>
                            <h3 className="metric-val">12</h3>
                        </div>
                    </div>
                    <div className="metric-card glass-panel">
                        <div className="metric-icon bg-warning-soft"><Clock /></div>
                        <div className="metric-info">
                            <p className="metric-label">Next Consult In</p>
                            <h3 className="metric-val">15 Mins</h3>
                        </div>
                    </div>
                    <div className="metric-card glass-panel">
                        <div className="metric-icon bg-success-soft"><IndianRupee /></div>
                        <div className="metric-info">
                            <p className="metric-label">Earnings Today</p>
                            <h3 className="metric-val">₹4,500</h3>
                        </div>
                    </div>
                </section>

                <section className="tracking-section glass-panel mt-4" style={{ borderColor: 'rgba(14, 165, 233, 0.3)' }}>
                    <div className="section-head">
                        <h2>Next Appointment</h2>
                        <span className="badge in-progress" style={{ background: 'rgba(14, 165, 233, 0.2)', color: 'var(--primary)' }}>Teleconsultation</span>
                    </div>
                    <div className="tracking-card" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <div className="service-details">
                            <div className="avatar" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>RK</div>
                            <div>
                                <h3>Rahul Kumar</h3>
                                <p className="text-secondary">Follow-up • Hypertension (SpO2: 99%, BP: 140/90)</p>
                            </div>
                        </div>
                        <div className="eta-box flex-between" style={{ gap: '1rem' }}>
                            <button className="btn btn-outline">View Records</button>
                            <button className="btn btn-primary"><Video className="icon-sm" /> Start Call</button>
                        </div>
                    </div>
                </section>

                <div className="dashboard-grid mt-4">
                    <div className="glass-panel p-4">
                        <div className="flex-between mb-3">
                            <h2>Waiting Room</h2>
                            <span className="text-secondary text-sm">3 Patients</span>
                        </div>
                        <div className="list-group">
                            <div className="list-item">
                                <div className="avatar sm">AM</div>
                                <div className="item-content">
                                    <h4>Anita Menon</h4>
                                    <p className="text-secondary text-sm">11:00 AM • Video Consult • General Physician</p>
                                </div>
                            </div>
                            <div className="list-item">
                                <div className="avatar sm">SJ</div>
                                <div className="item-content">
                                    <h4>Suresh Jain</h4>
                                    <p className="text-secondary text-sm">11:30 AM • Video Consult • Cardiology</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-4">
                        <div className="flex-between mb-3">
                            <h2>Performance Insights</h2>
                        </div>
                        <div className="vitals-grid">
                            <div className="vital-card" style={{ textAlign: 'center' }}>
                                <h3 style={{ fontSize: '2rem', color: '#FBBF24' }}>4.9</h3>
                                <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', color: '#FBBF24', margin: '0.5rem 0' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="icon-sm" style={{ fill: '#FBBF24' }} />)}
                                </div>
                                <p className="vital-label">Patient Rating (120 reviews)</p>
                            </div>
                            <div className="vital-card" style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                    <CheckCircle className="text-success" style={{ width: 32, height: 32 }} />
                                </div>
                                <p className="vital-val">98%</p>
                                <p className="vital-label">SLA Compliance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

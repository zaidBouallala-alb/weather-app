import React from 'react';

/**
 * Error Boundary — catches runtime render errors and shows a friendly fallback.
 * Respects the current theme via CSS custom properties (data-theme on root).
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-xl)',
                    background: 'var(--bg-gradient)',
                    backgroundAttachment: 'fixed',
                }}>
                    <div
                        className="glass-panel"
                        style={{
                            maxWidth: 480,
                            width: '100%',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-lg)',
                            padding: 'var(--space-2xl) var(--space-xl)',
                        }}
                    >
                        <div style={{ fontSize: '3rem' }}>⚠️</div>
                        <h2 style={{
                            fontSize: 'var(--text-xl)',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            margin: 0,
                        }}>
                            Something went wrong
                        </h2>
                        <p style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-secondary)',
                            margin: 0,
                            lineHeight: 1.6,
                        }}>
                            An unexpected error occurred. Please try again or reload the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <pre style={{
                                fontSize: 'var(--text-xs)',
                                color: 'var(--error-text)',
                                background: 'var(--error-bg)',
                                border: '1px solid var(--error-border)',
                                borderRadius: 'var(--radius-sm)',
                                padding: 'var(--space-md)',
                                overflow: 'auto',
                                textAlign: 'left',
                                maxHeight: 120,
                            }}>
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                            <button
                                onClick={this.handleRetry}
                                style={{
                                    padding: 'var(--space-sm) var(--space-lg)',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--surface-border)',
                                    background: 'var(--surface)',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 500,
                                    transition: 'all var(--transition-fast)',
                                }}
                            >
                                Try Again
                            </button>
                            <button
                                onClick={this.handleReload}
                                style={{
                                    padding: 'var(--space-sm) var(--space-lg)',
                                    borderRadius: 'var(--radius-full)',
                                    border: 'none',
                                    background: 'var(--accent)',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 500,
                                    transition: 'all var(--transition-fast)',
                                }}
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
